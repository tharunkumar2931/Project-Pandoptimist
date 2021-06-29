import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DoctorRedis } from 'src/app/Model/DoctorRedis';
import { RegisteredUser } from 'src/app/Model/registered-user';
import { LoginuserService } from 'src/app/services/loginuser.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  hide: boolean = true;
  regUser1: RegisteredUser = new RegisteredUser();
  success: boolean = false;
  invalidform: boolean = false;
  doctorOnline: DoctorRedis = new DoctorRedis();
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-z]+\.[.]com$")]],// emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";//
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
  });

  constructor(private fb: FormBuilder, private loginService: LoginuserService,
    private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.invalidform = false;
    this.success = false;
  }

  onSubmitLogin() {
    this.invalidform = false;
    this.regUser1 = this.loginForm.value;
    this.loginService.loggedinuser = this.regUser1;
    if (this.loginForm.valid) {
      this.loginService.generateJwtToken(this.regUser1).subscribe(
        (token: any) => {
          this.success = true;

          localStorage.setItem('role', token.headers.get('role'));
          localStorage.setItem('email', token.headers.get('email'));
          this.loginService.setToken(token.headers.get('token'));
          if (localStorage.getItem('role') == 'doctor') {
            this.doctorOnline.email = localStorage.getItem('email');
            this.doctorOnline.status = "online";
            this.loginService.updateStatusOnline(this.doctorOnline).subscribe();
          }

          setTimeout(() => {
            if (!token.headers.get('role') && token.headers.get('token')) {
              this.loginForm.reset();
              this.router.navigate(['/role']);
            } else if (token.headers.get('token')) {
              this.loginForm.reset();
              if (token.headers.get('role') == 'doctor') {
                this.router.navigate(['/doctor-dashboard']);
              } else if (token.headers.get('role') == 'donor') {
                this.router.navigate(['/donor-dashboard']);
              } else if (token.headers.get('role') == 'volunteer') {
                this.router.navigate(['/volunteer-dashboard']);
              }
            }
          }, 3000);
        },
          error => {
            this.openSnackBar("Invalid Credentials / Connection error!   PLEASE TRY AGAIN", "X");
          }
        );
    }
    else {
      this.invalidform = true;
      // this.openSnackBar("Invalid, Please enter valid details","X");
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }
}