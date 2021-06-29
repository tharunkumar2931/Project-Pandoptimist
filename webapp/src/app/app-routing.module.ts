import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocterRegistrationComponent } from './components/docter-registration/docter-registration.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { VolunteerRegistrationComponent } from './components/volunteer-registration/volunteer-registration.component';
import { VolunteerDashboardComponent } from './components/volunteer-dashboard/volunteer-dashboard.component';
import { DonorRegisterationComponent } from './components/donor-registeration/donor-registeration.component';
import { DonorDashboardComponent } from './components/donor-dashboard/donor-dashboard.component';
import { OtpFormComponent } from './components/otp-form/otp-form.component';
import { RoleComponent } from './components/role/role.component';
import { AuthGuard } from './auth.guard';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { AddResourceComponent } from './components/add-resource/add-resource.component';
import { ChatServiceComponent } from './components/chat-service/chat-service.component';
import { SosRequestComponent } from './components/sos-request/sos-request.component';
import { PatientloginComponent } from './components/patientlogin/patientlogin.component';
import { SearchResourceComponent } from './components/search-resource/search-resource.component';
import { VolunteerScoreComponent } from './components/volunteer-score/volunteer-score.component';
// import { Verify } from 'crypto';
import { VerificationComponent } from './components/verification/verification.component';
const routes: Routes = [
  {path:'patient-dashboard',component:PatientDashboardComponent},
  {path: 'doctor-dashboard', component:DoctorDashboardComponent,canActivate:[AuthGuard]},
  {path: 'doctor-registration', component:DocterRegistrationComponent,canActivate:[AuthGuard] },
  {path: 'register', component: RegistrationComponent},
  {path: '', redirectTo: "home" , pathMatch : "full",},
  {path: 'home', component:HomeComponent, pathMatch : "full"},
  {path: 'login' , component: LoginComponent},
  {path: 'volunteer-register',component:VolunteerRegistrationComponent,canActivate:[AuthGuard] },
  {path: 'volunteer-dashboard',component:VolunteerDashboardComponent,canActivate:[AuthGuard] },
  {path: 'donor-register',component:DonorRegisterationComponent },
  {path: 'donor-dashboard',component:DonorDashboardComponent,canActivate:[AuthGuard] },
  {path: 'otp-form',component:OtpFormComponent,canActivate:[AuthGuard]  },
  {path: 'role', component:RoleComponent, pathMatch : "full",canActivate:[AuthGuard] },
  {path: 'add-Resource', component:AddResourceComponent,canActivate:[AuthGuard] },
  {path: 'patient-login', component:PatientloginComponent},
  {path: 'search-resource', component:SearchResourceComponent,canActivate:[AuthGuard] },
  {path: 'sos', component:SosRequestComponent,canActivate:[AuthGuard] },
  {path: 'score-card', component:VolunteerScoreComponent,canActivate:[AuthGuard] },
  {path: 'verification', component:VerificationComponent,canActivate:[AuthGuard] },
  {path: 'chat', component: ChatServiceComponent,canActivate:[AuthGuard] },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
