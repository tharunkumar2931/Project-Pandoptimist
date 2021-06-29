import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalRequest } from '../Model/MedicalResquest';
import { Resource } from '../Model/Resource';
import { VolunteerScore } from '../Model/VolunteerScore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SOSRequestService {
  apiBaseUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  getRandomRequests(): Observable<MedicalRequest> {
    return this.http.get<MedicalRequest>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/openRequest/random`);
  }

  getScores(): Observable <Array<VolunteerScore>>{
    return this.http.get<Array<VolunteerScore>>(this.apiBaseUrl+`/war-room-service/api/v1/volunteer/leader-board`);
  }

  getRandomUnverifiedResorce(): Observable<Resource> {
    return this.http.get<Resource>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/unverified/random`);
  }

}
