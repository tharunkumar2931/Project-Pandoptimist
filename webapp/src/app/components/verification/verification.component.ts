import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resource } from 'src/app/Model/Resource';
import { RouterService } from 'src/app/services/router.service';
import { SendResourceService } from 'src/app/services/send-resource.service';
import { SOSRequestService } from 'src/app/services/sosrequest.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  constructor(private snackBar:MatSnackBar ,private routerService:RouterService,private service: SOSRequestService,private resService:SendResourceService) { }
  myResource: Resource= new Resource();


  ngOnInit(): void {
    this.getRandomRequest();
  }
  openSnackBar(message, action){
    this.snackBar.open(message,action);
  }

  getRandomRequest(){
    this.service.getRandomUnverifiedResorce().subscribe(data=>{
      console.log(data)
        this.myResource=data;       
        console.log(this.myResource)
    }, error=>{
      console.log("error")
    })
  }
  verifyResource(){
    this.resService.verifyResource(this.myResource.id,this.myResource).subscribe(data=>{
      this.openSnackBar('Resource has been verified successfully!!','Dismiss')
      this.ngOnInit();
        console.log(data)
    },error=>{
      console.log(error)
    })
  }

  unVerifyResource(){
    this.resService.unverifyResource(this.myResource.id,this.myResource).subscribe(data=>{
      this.openSnackBar('Resource is not verified!!','Dismiss')
      this.ngOnInit();
        console.log(data)
    },error=>{
      console.log(error)
    })
  }
}
