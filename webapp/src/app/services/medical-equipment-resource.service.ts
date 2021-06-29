import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalEquipment } from '../Model/MedicalEquipment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalEquipmentResourceService {

  apiBaseUrl=environment.apiBaseUrl;

  // console.log("url is -->"+apiBaseUrl);

  constructor(private http: HttpClient) { }

  addEquipments(medicalEquipment : MedicalEquipment): Observable<MedicalEquipment> {
    return this.http.post<MedicalEquipment>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/medicalEquipment`, medicalEquipment);
  }


  getEquipments(): Observable<Array<MedicalEquipment>> {
    return this.http.get<Array<MedicalEquipment>>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/medicalEquipments`);
  }
}
