import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Doctor } from '../Model/Doctor';
import { DoctorRedis } from '../Model/DoctorRedis';
import { HealthTips } from './../Model/HealthTips';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }
  getDoctorsTips(): Observable<Array<HealthTips>> {
    return this.http.get<Array<HealthTips>>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/allhealthTips`);
  }
  addDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/doctor`, doctor);
  }
  getHealthTips(): Observable<Array<HealthTips>> {
    return this.http.get<Array<HealthTips>>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/allhealthTips`);
  }
  addHealthTips(healthTip: HealthTips): Observable<HealthTips> {
    return this.http.post<HealthTips>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/healthTip`, healthTip);
  }

  searchSpecificDoctor(emailId:String): Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/search/${emailId}`);

}
}