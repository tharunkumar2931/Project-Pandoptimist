import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DoctorRedis } from '../Model/DoctorRedis';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantServiceService {

  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);
  constructor(private http:HttpClient) { }

  getAllDoctorsOnline(): Observable<Array<DoctorRedis>>{
   return this.http.get<Array<DoctorRedis>>(this.apiBaseUrl+`/doctor-consultation-service/api/v1/getdoctorsOnline`);
  }

  doctorEngaged:DoctorRedis=new DoctorRedis();




}
