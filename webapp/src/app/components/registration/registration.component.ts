import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisteredUser } from 'src/app/Model/registered-user';
import { RegisteruserService } from 'src/app/services/registeruser.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regUser: RegisteredUser = new RegisteredUser();
  hide: boolean = true;
  registered: any;
  success: boolean = false;
  invalidform: boolean = false;

  constructor(private fb: FormBuilder,
    private registerservice: RegisteruserService,
    private router: Router, 
    private snackbar: MatSnackBar) { }

  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-z]+\.[.]com$")]],
    password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
  });

  ngOnInit(): void {
    this.success = false;
    this.invalidform = false;

  }

  onSubmit() {
    this.invalidform = false;
    if (this.registerForm.valid) {
      this.registerservice.registerUser(this.registerForm.value).subscribe(
        (data) => {
          this.success = true;
          this.regUser = this.registerForm.value;
          setTimeout(() => {
            this.goToLogin();
          }, 3000);
        },
        error => {
          this.openSnackBar("Invalid Credentials / Connection error!   PLEASE TRY AGAIN.", "X");
        }
        );
      

    } else {
      this.invalidform = true;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }

}