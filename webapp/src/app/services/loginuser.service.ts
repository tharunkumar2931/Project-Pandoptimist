import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisteredUser } from '../Model/registered-user';
import { Observable, throwError } from 'rxjs';
import { DoctorRedis } from '../Model/DoctorRedis';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

 
  loggedinuser: RegisteredUser = new RegisteredUser();
  constructor(private http: HttpClient) { }
  public loggedIn:boolean = false;
  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);


  //for login user
  setToken(token) {
    localStorage.setItem("token", token);
    return true;
  }

  isPatientLoggedin(){
    let patient1 = localStorage.getItem("patient");
    if (patient1 == "true") {
      return true;
    } else {
      return false;
    }
  }

  //to check that user is logged in
  isLoggedin() {
    let token = localStorage.getItem("token");
    if (token == null || token == '' || token == undefined) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('patient');
    return true;
  }

  //get token
  getToken() {
    return localStorage.getItem("token");
  }
 

  //calling server to generate token
  public generateJwtToken(credentials: RegisteredUser): Observable<any> {
    return this.http.post(this.apiBaseUrl+`/user-management-service/api/v2/login`, credentials, { observe: 'response' });
  }


  public roleUpdate(userWithRole: RegisteredUser): Observable<any> {
    let tokenStr = 'Bearer ' + this.getToken();
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    console.log('----------------');
    return this.http.post(this.apiBaseUrl+`/user-management-service/api/v1/updaterole`, userWithRole);
  }

  public updateStatusOnline(doctorOnline:DoctorRedis): Observable<any>{
    return this.http.post(this.apiBaseUrl+`/doctor-consultation-service/api/v1/setstatusOnline`,doctorOnline);
  }

  public setStatusBusy(doctorOnline:DoctorRedis): Observable<any>{
    return this.http.post(this.apiBaseUrl+`/doctor-consultation-service/api/v1/updatestatusBusy`,doctorOnline);
  }



}