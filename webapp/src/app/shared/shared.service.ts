import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  nameOfResource:String;
  location:String;
  constructor() { }

  setResource(data: String){
    this.nameOfResource=data
  }
  setLocation(data: String){
    this.location=data
  }

  getResource(){
    return this.nameOfResource;
  }

  getLocation(){
    return this.location;
  }
}
