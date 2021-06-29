import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { Mail } from '../Model/Mail';
import { User } from '../Model/OTP';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OtpService {

  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }
  
  sendMailForOtp(email:Mail): Observable<Mail>{
    console.log(email)
    return this.http.post<Mail>(this.apiBaseUrl+'/otp-service/api/v1/user', email);
  }


  OtpVerification(otpnum:Number,otpmail:String):Observable<String>{
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });
    return this.http.get(this.apiBaseUrl+`/otp-service/api/v1/validate/otp/${otpnum}/mail/${otpmail}`, {headers:reqHeader, responseType:'text'});
   
  }

  }
