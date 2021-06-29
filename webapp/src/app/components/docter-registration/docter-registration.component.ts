import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/Model/Doctor';
import { Mail } from 'src/app/Model/Mail';
import { DoctorService } from 'src/app/services/doctor.service';
import { OtpService } from 'src/app/services/otp.service';
import { RouterService } from 'src/app/services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-docter-registration',
  templateUrl: './docter-registration.component.html',
  styleUrls: ['./docter-registration.component.css']
})
export class DocterRegistrationComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private service: DoctorService, private otpService: OtpService, private routerService: RouterService,) {}

  selectedFile: File;
  optmessage: String;
  otpNumber: Number;
  myemail: Mail = new Mail();
  doctor: Doctor = new Doctor();
  otpverified: String;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  doctorArray: Array < Doctor >= [];
  imageURL: string;
  fullName:''
  prefilledemail:Mail = new Mail();



  ngOnInit(): void {
      this.prefilledemail.mail=localStorage.getItem('email');
  }

  doctrorRegisterForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      medicalRegistrationNumber: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      specialist: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
      mobileNumber: new FormControl(null, [Validators.required, Validators.maxLength(10),
          Validators.pattern('(0/91)?[7-9][0-9]{9}')
      ]),
      email: new FormControl(),
      image: new FormControl(null, Validators.required),
      otp: new FormControl(null, [Validators.required, Validators.maxLength(6), Validators.pattern("^[0-9]*$")])

  })

  get name() {
      return this.doctrorRegisterForm.get('name');
  }

  get medicalRegistrationNumber() {
      return this.doctrorRegisterForm.get('medicalRegistrationNumber');
  }
  get specialist() {
    return this.doctrorRegisterForm.get('specialist');
}

  get mobileNumber() {
      return this.doctrorRegisterForm.get('mobileNumber');
  }
//   get email() {
//       return this.doctrorRegisterForm.get('email');
//   }
  get otp() {
      return this.doctrorRegisterForm.get('otp');
  }

  // Image Preview
  showPreview(event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.doctrorRegisterForm.patchValue({
          avatar: file
      });
      this.doctrorRegisterForm.get('name').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
          this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
  }

  openSnackBar(message, action) {
      this.snackBar.open(message, action);
  }

  register() {
      if (!this.doctrorRegisterForm.valid) {
          this.openSnackBar('Please fill the form', 'Dismiss')
      } else {
          if (this.otpverified !== "VALID") {
              this.openSnackBar('Please verify your OTP', 'Dismiss')
          } else {
            this.doctrorRegisterForm.get('email').setValue(this.prefilledemail.mail);
            console.log(this.doctrorRegisterForm.value)

              this.service.addDoctor(this.doctrorRegisterForm.value).subscribe((data) => {
                  this.doctorArray.push(data);
                  this.routerService.routeToDashboard();
              }, (error) => {
                  console.log("Error!!!!!!")
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
