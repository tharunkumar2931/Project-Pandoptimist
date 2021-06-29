import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bed } from '../Model/Bed';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BedResourceService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addBed(bed: Bed): Observable<Bed> {
    return this.http.post<Bed>(this.apiBaseUrl + `/medical-request-service/api/v1/resource/bed`, bed);
  }


  getBeds(): Observable<Array<Bed>> {
    return this.http.get<Array<Bed>>(this.apiBaseUrl + `/medical-request-service/api/v1/resource/beds`);
  }
}
