import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Mail } from 'src/app/Model/Mail';
import { RegisteredUser } from 'src/app/Model/registered-user';
import { LoginuserService } from 'src/app/services/loginuser.service';
import { OtpService } from 'src/app/services/otp.service';


@Component({
  selector: 'app-patientlogin',
  templateUrl: './patientlogin.component.html',
  styleUrls: ['./patientlogin.component.css']
})
export class PatientloginComponent implements OnInit {

  otpmail: Mail = new Mail();
  otpmessage: boolean = false;
  hide: boolean = true;
  regUserotp: RegisteredUser = new RegisteredUser();
  otpVerified: boolean = false;
  otpinvalid = false;
  success: boolean = false;
  isVerifyDisabled=true;
  isSendDisabled=true;
  ifOtpSent=false;


  constructor(private fb: FormBuilder, private router: Router,
    private otpService: OtpService, private loginservice: LoginuserService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.success = false;
    this.isVerifyDisabled=true;
    this.isSendDisabled=true;
    this.ifOtpSent=false;
  }

  ngDoCheck():void{
    if(this.otploginForm.get('email').valid){
      this.isSendDisabled=false;
    }  
    if(this.otploginForm.get('otp').valid){
      this.isVerifyDisabled=false;
    } 
  }

  
 


  get email() { return this.otploginForm.get('email') }
  get otp() { return this.otploginForm.get('otp') }

  public otploginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-z]+\.[.]com$")]],
    otp: ['', [Validators.required, Validators.pattern("^[0-9].{5,5}$")]],
  });

  sendOtp() {
    this.otpmail.mail = this.email.value;
    this.otpService.sendMailForOtp(this.otpmail).subscribe((data) => {
      this.otpmessage = true;
      console.log(this.otpmessage);
      
    })
    this.ifOtpSent=true;
  }
  verifyOtp() {
    if(this.otploginForm.valid){
    this.otpinvalid = false;
    this.otpService.OtpVerification(this.otp.value, this.email.value).subscribe((data) => {
      if (data == "OTP IS VALID") {
        this.otpVerified = true;
        this.success = true;
        localStorage.setItem('email', this.email.value);
        localStorage.setItem('patient', "true");

        this.router.navigate(['/patient-dashboard']);

      }
      else {
        this.otpinvalid = true;
      }

    }, (error) => {
      console.log(error)
    })
  }else{
    this.openSnackBar("Enter email to send OTP", "X");
    
  }
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  // onSubmitLogin() {
  //   console.log(this.email.value);
  //   this.router.navigate(['/patient-dashboard']);
  // }

}
