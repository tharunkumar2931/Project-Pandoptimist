import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Donor } from 'src/app/Model/donor';
import { Mail } from 'src/app/Model/Mail';
import { DonorService } from 'src/app/services/donor.service';
import { OtpService } from 'src/app/services/otp.service';
import { RouterService } from './../../services/router.service';
import { cities } from './../../Model/cities-state';

import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

interface BloodGroup {
  bloodType: string;
  bloodName: string;
}

@Component({
  selector: 'app-donor-registeration',
  templateUrl: './donor-registeration.component.html',
  styleUrls: ['./donor-registeration.component.css']
})
export class DonorRegisterationComponent implements OnInit {



  bloodGroups: BloodGroup[] = [
    { bloodType: 'A+', bloodName: 'A+' },
    { bloodType: 'A-', bloodName: 'A-' },
    { bloodType: 'B+', bloodName: 'B+' },
    { bloodType: 'B-', bloodName: 'B-' },
    { bloodType: 'AB+', bloodName: 'AB+' },
    { bloodType: 'AB-', bloodName: 'AB-' },
    { bloodType: 'O-', bloodName: 'O-' },
    { bloodType: 'O+', bloodName: 'O+' },
  ];

  public donor: Donor[];
  optmessage: String;
  otpNumber: Number;
  myemail: Mail = new Mail();

  constructor(private snackBar: MatSnackBar, private donorService: DonorService, private otpService: OtpService, private routerService: RouterService) { }
  donorArray: Array<Donor> = [];
  otpverified: String;
  fullName: ''
  imageURL: string;
  donorform: FormGroup

  options: string[] = cities;
  suggestions: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  prefilledemail: Mail = new Mail();


  ngOnInit() {
    this.prefilledemail.mail = localStorage.getItem('email');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );

    this.donorform = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      'age': new FormControl(null, [Validators.required, Validators.maxLength(2), Validators.pattern('^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$')]),
      'emailId': new FormControl(),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.maxLength(10),
      Validators.pattern('(0/91)?[7-9][0-9]{9}')
      ]),
      'myCity': new FormControl(null),
      'otp': new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      'bloodGroup': new FormControl(null, Validators.required),
      'image': new FormControl(),


    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const arrayCity = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()

    this.myCity.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }

  get name() {
    return this.donorform.get('name');
  }
  get myCity() {
    return this.donorform.get('myCity');
  }
  // get emailId() {
  //   return this.donorform.get('emailId');
  // }
  get age() {
    return this.donorform.get('age');
  }
  get city() {
    return this.donorform.get('city');
  }
  get bloodGroup() {
    return this.donorform.get('bloodGroup');
  }
  get phoneNumber() {
    return this.donorform.get('phoneNumber');
  }
  get otp() {
    return this.donorform.get('otp');
  }
  get image() {
    return this.donorform.get('image');
  }

  public getDonorsAvailable(): void {
    this.donorService.getDonors().subscribe(
      (response: Donor[]) => {
        this.donor = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }

  DonorRegister() {
    if (!this.donorform.valid) {
      this.openSnackBar('Please fill the form', 'Dismiss')
    } else {
      if (this.otpverified !== "VALID") {
        this.openSnackBar('Please verify your OTP', 'Dismiss')
      } else {
        this.donorform.get('emailId').setValue(this.prefilledemail.mail);
        console.log(this.donorform.value);
        this.donorService.addDonor(this.donorform.value).subscribe(data => {
          this.donorArray.push(data);
          this.routerService.routeTodonorDashboard();
        })
      }
    }
  }


  getOtp() {
    console.log(this.prefilledemail.mail);
    this.openSnackBar('OTP sent to your mail', 'Dismiss')
    this.otpService.sendMailForOtp(this.prefilledemail).subscribe((data) => {
      this.optmessage = "Success";
    })
  }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.donorform.patchValue({
      avatar: file
    });
    this.donorform.get('name').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  verifyOtp() {
    this.otpService.OtpVerification(this.otpNumber, this.prefilledemail.mail).subscribe((data) => {
      if (data == "OTP IS VALID") {
        this.openSnackBar('Otp is Verified', 'Dismiss')
        this.otpverified = "VALID";

      }
      else {
        this.openSnackBar('Otp is Invalid', 'Dismiss')
      }

    }, (error) => {
      console.log(error)
    })
  }

}
