import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicine } from '../Model/Medicine';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineResourceService {

  apiBaseUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addMedicines(medicine: Medicine): Observable<Medicine> {
    console.log("aaaaaa"+medicine.isVerified)
    return this.http.post<Medicine>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/medicine`, medicine);
  }


  getMedicines(): Observable<Array<Medicine>> {
    return this.http.get<Array<Medicine>>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/medicines`);
  }
}
