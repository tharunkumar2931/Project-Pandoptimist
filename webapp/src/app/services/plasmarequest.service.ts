import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PlasmaRequest } from './request';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlasmarequestService {

  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }

  addPlasmaRequest(plasmaRequest:PlasmaRequest):Observable<PlasmaRequest>{
    return this.http.post<PlasmaRequest>(this.apiBaseUrl+'/patient-service/api/v1/plasmaRequest',plasmaRequest);
  }

  getDonar(bloodGroup:String,city:String){
    return this.http.get(this.apiBaseUrl+`/patient-service/api/v1/donors/${bloodGroup}/${city}`);
  }

  deleteDonor(id){
    return this.http.delete(this.apiBaseUrl+`/patient-service/api/v1/donors/${id}`)
  }

 
   

  
}
