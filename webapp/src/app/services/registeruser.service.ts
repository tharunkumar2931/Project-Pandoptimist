import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisteredUser } from '../Model/registered-user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  apiBaseUrl=environment.apiBaseUrl;
  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }

  


  registerUser(regUser: RegisteredUser): Observable<Object> {
    return this.http.post<RegisteredUser>(this.apiBaseUrl+"/user-management-service/api/v2/register", regUser);
  }
}
