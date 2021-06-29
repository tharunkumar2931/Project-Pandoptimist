import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailQueue } from '../Model/EmailQueue';
import { MedicalRequest } from '../Model/MedicalResquest';
import { environment } from 'src/environments/environment';
import { Resource } from 'src/app/Model/Resource';

@Injectable({
  providedIn: 'root'
})
export class SendResourceService {

  apiBaseUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  addResource(emailQueue:EmailQueue,id:Number,body:String,email:String,volEmail:String,type:String): Observable<EmailQueue> {
    console.log(volEmail)
    console.log(id)
    console.log(type)
    return this.http.post<EmailQueue>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/close/${id}/${email}/${volEmail}/${type}?body=${body}`,emailQueue);
  }

  passRequest(id:Number,medical:MedicalRequest,volEmail:String,type:String): Observable<MedicalRequest> {
    
    return this.http.put<MedicalRequest>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/pass/${id}/${volEmail}/${type}`,medical);
  }

  verifyResource(id:Number,resource:Resource): Observable<Resource> {
    console.log(id+"-----")
    console.log(resource+"-----")
    return this.http.post<Resource>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/verify/${id}`,resource);
  }
  unverifyResource(id:Number,resource:Resource): Observable<Resource> {
    console.log(id+"-----")
    console.log(resource+"-----")
    return this.http.post<Resource>(this.apiBaseUrl+`/medical-request-service/api/v1/resource//unverify/${id}`,resource);
  }

}
