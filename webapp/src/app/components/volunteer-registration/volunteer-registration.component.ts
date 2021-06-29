import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../../Model/volunteer';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { RouterService } from 'src/app/services/router.service';
import { Mail } from 'src/app/Model/Mail';
import { OtpService } from 'src/app/services/otp.service';
import { LoginuserService } from 'src/app/services/loginuser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-volunteer-registration',
  templateUrl: './volunteer-registration.component.html',
  styleUrls: ['./volunteer-registration.component.css']
})
export class VolunteerRegistrationComponent implements OnInit {

  errors = errorMessages;
  showMsg: boolean = false;
  otpNumber: Number;
  myemail: Mail = new Mail();
  selectedFile: File;
  message: string;
  retrievedImage: any;
  otpverified: String;
  base64Data: any;
  optmessage: String;
  retrieveResonse: any;
  imageName: any;
  fullName = '';
  public volunteers: Volunteer[];
  volunteerform: FormGroup

  imageURL: string;

  options: string[] = cities;
  suggestions: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  prefilledemail:Mail = new Mail();

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private volunteerService: VolunteerService, private routerService: RouterService, private otpService: OtpService,
      private loginservice: LoginuserService) {}
  volunteerArray: Array < Volunteer >= [];
  avatar: ''
  ngOnInit() {
    this.prefilledemail.mail=localStorage.getItem('email');
    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
    );

 

  this.volunteerform = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      'phoneNumber': new FormControl(' ', [Validators.required, Validators.maxLength(10),
          Validators.pattern('(0/91)?[7-9][0-9]{9}')
      ]),
      'myCity' :new FormControl(null),
      'filepath': new FormControl('', [Validators.required]),
      'emailId': new FormControl(),
      'otp': new FormControl(' ', [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      // picture: new FormControl('', [Validators.required]),
  });
}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   const arrayCity=this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()
   
    this.myCity.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
   
  }


  // Image Preview
  showPreview(event) {
      const file = (event.target as HTMLInputElement).files[0];
      console.log(file)
      this.volunteerform.patchValue({
          avatar: file
      });
      this.volunteerform.get('name').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
          this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
  }

  get myCity() {
    return this.volunteerform.get('myCity');
  }
  get name() {
      return this.volunteerform.get('name');
  }
//   get emailId() {
//       return this.volunteerform.get('emailId');
//   }
  get phoneNumber() {
      return this.volunteerform.get('phoneNumber');
  }
  get otp() {
      return this.volunteerform.get('otp');
  }

  get filepath() {
      return this.volunteerform.get('filepath');
  }

  // get picture() {
  //   return this.volunteerform.get('picture');
  // }

  openSnackBar(message, action) {
      this.snackBar.open(message, action);
  }

  public getVolunteersAvailable() {

      this.volunteerService.getVolunteers().subscribe(
          (response: Volunteer[]) => {
              this.volunteers = response;
          },
          (error: HttpErrorResponse) => {
              alert(error.message);
          }
      );
  }




  VolunteerRegister() {
      if (!this.volunteerform.valid) {
          this.openSnackBar('Please fill the form', 'Dismiss')
      } else {
          if (this.otpverified !== "VALID") {
              this.openSnackBar('Please verify your OTP', 'Dismiss')
          } else {
            this.volunteerform.get('emailId').setValue(this.prefilledemail.mail);
            console.log(this.volunteerform.value)
              this.volunteerService.addVolunteer(this.volunteerform.value).subscribe((data) => {
                  this.volunteerArray.push(data);
                  this.routerService.routeTovolunteerDashboard();
              }, (error) => {
                  console.log("Error!!!!!!")
              })
          }
      }
  }

  getOtp() {
      console.log(this.prefilledemail.mail);
      this.otpService.sendMailForOtp(this.prefilledemail).subscribe((data) => {
          this.optmessage = "Success";
          this.openSnackBar('OTP sent to your mail', 'Dismiss')
      })
  }

  verifyOtp() {
      this.otpService.OtpVerification(this.otpNumber, this.prefilledemail.mail).subscribe((data) => {
          if (data == "OTP IS VALID") {
              this.openSnackBar('Otp is Verified', 'Dismiss')
              this.otpverified = "VALID";

          } else {
              this.openSnackBar('Otp is Invalid', 'Dismiss')
          }

      }, (error) => {
          console.log(error)
      })
  }


}
export const errorMessages: {
  [key: string]: string
} = {
  volunteer_name: 'Enter a valid Name',
  volunteer_email: 'Enter a valid email address (username@gmail.com)',
  volunteer_mobileNumber: 'Enter 10 digit mobile number',

};