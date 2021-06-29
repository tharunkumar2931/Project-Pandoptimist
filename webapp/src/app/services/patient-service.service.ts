
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Patient } from '../Model/patient';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }

  addRequest(patient:Patient):Observable<Patient>{
    return this.http.post<Patient>(this.apiBaseUrl+'/patient-service/api/v1/medicalRequest',patient);
  }
}
