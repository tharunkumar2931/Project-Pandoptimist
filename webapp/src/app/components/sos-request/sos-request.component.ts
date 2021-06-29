import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchData } from 'src/app/Model/DataToSearch';
import { EmailQueue } from 'src/app/Model/EmailQueue';
import { MedicalRequest } from 'src/app/Model/MedicalResquest';
// import { Requirement } from 'src/app/Model/Requirement';
import { VolunteerTrack } from 'src/app/Model/VolunteerTrack';
import { Requirements } from 'src/app/services/requirement';

import { RouterService } from 'src/app/services/router.service';
import { SendResourceService } from 'src/app/services/send-resource.service';
import { SOSRequestService } from 'src/app/services/sosrequest.service';
import { SharedService } from 'src/app/shared/shared.service';
@Component({
  selector: 'app-sos-request',
  templateUrl: './sos-request.component.html',
  styleUrls: ['./sos-request.component.css']
})
export class SosRequestComponent implements OnInit {
  constructor(private snackBar:MatSnackBar ,private routerService:RouterService,private service: SOSRequestService,private resService:SendResourceService,private shared:SharedService) { }
myRequest: MedicalRequest= new MedicalRequest;
comments:String
emailQueue:EmailQueue;
trackVoulnteer:VolunteerTrack;
myrequirment: Array<Requirements> = new Array();
emailId=localStorage.getItem('email');
typeOfRequest:String;


searchData:SearchData=new SearchData();

  ngOnInit(): void {
    console.log("Inside oninit sos")
      this.getRandomRequest()
     console.log(this.emailId);
  }
  openSnackBar(message, action){
    this.snackBar.open(message,action);
  }
  getRandomRequest(){
    this.service.getRandomRequests().subscribe(data=>{
      console.log(data)
        this.myRequest=data;
        
        // For making search auto
        this.searchData.resource=this.myRequest.requirement[0].requirementName;
        this.searchData.location=this.myRequest.myCity;  
        console.log("sos--"+this.searchData.resource+"  "+this.searchData.location);
        // this.shared.setResource(this.resourceName);
        // this.shared.setResource(this.locationName);
        

        console.log(this.myRequest)
    }, error=>{
      console.log("error")
    })
  }
  // closeRequest(){

  //  this.emailQueue=new EmailQueue(this.myRequest.email,this.comments);
  //  console.log(this.emailQueue);
  //  this.resService.addResource(this.emailQueue,this.myRequest.id,this.comments,this.myRequest.email).subscribe(data=>{
  //   this.openSnackBar('Resquest has been closed successfully!!','Dismiss')
  //     console.log(data)
  //     this.comments='';
  //     // this.routerService.routeToSOSRequest();
  //     this.ngOnInit();
  //  },error=>{
  //    console.log(error)
  //    this.openSnackBar('Resquest has been closed successfully!!','Dismiss')
  //     this.comments='';
  //     this.ngOnInit();
  //  })
  // }

  closeRequest(){

    this.emailQueue=new EmailQueue(this.myRequest.email,this.comments);
    // console.log(this.emailQueue);
    
    
     console.log(this.myRequest)
     if(this.myRequest.type=="Medicine"){
       this.typeOfRequest="Request_Closure_Medicine"
     }else if(this.myRequest.type=="Bed"){
      this.typeOfRequest="Request_Closure_Bed"
     }else if(this.myRequest.type=="Equipment"){
      this.typeOfRequest="Request_Closure_Equipment"
     }
    this.resService.addResource(this.emailQueue,this.myRequest.id,this.comments,this.myRequest.email,this.emailId,this.typeOfRequest).subscribe(data=>{
     this.openSnackBar('Resquest has been closed successfully!!','Dismiss')
    //  console.log("Track Volunterr"+this.trackVoulnteer);
       console.log(data)
       this.comments='';
       // this.routerService.routeToSOSRequest();
       this.ngOnInit();
    },error=>{
      console.log(error)
      this.openSnackBar('Resquest has been closed successfully!!','Dismiss')
       this.comments='';
       this.ngOnInit();
    })
   }

  PassRequest(){
    console.log(this.myRequest)
    if(this.myRequest.type=="Medicine"){
      this.typeOfRequest="Request_Pass_Medicine"
    }else if(this.myRequest.type=="Bed"){
     this.typeOfRequest="Request_Pass_Bed"
    }else if(this.myRequest.type=="Equipment"){
     this.typeOfRequest="Request_Pass_Equipment"
    }
    this.resService.passRequest(this.myRequest.id,this.myRequest,this.emailId,this.typeOfRequest).subscribe(data=>{
      console.log(data)
      this.openSnackBar('You have passed the request successfully!!','Dismiss')
      this.comments='';
      // this.routerService.routeToSOSRequest();
      this.ngOnInit();
    },error=>{
      console.log(error)
    })
  }
}
