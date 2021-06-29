import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../Model/Resource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  apiBaseUrl=environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  addResource(resource:Resource): Observable<Resource> {
    return this.http.post<Resource>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/addResource`, resource);
  }


  getResources(): Observable<Array<Resource>> {
    return this.http.get<Array<Resource>>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/allResources`);
  }

  searchResource(resourceName:String,cityName:String): Observable<Array<Resource>> {
    return this.http.get<Array<Resource>>(this.apiBaseUrl+`/medical-request-service/api/v1/resource/search/${resourceName}/${cityName}`)
  }
}
