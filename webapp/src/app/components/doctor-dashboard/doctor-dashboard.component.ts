import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DoctorService } from './../../services/doctor.service';
import { Doctor } from './../../Model/Doctor';
import { DoctorRedis } from './../../Model/DoctorRedis';
import { HealthTips } from './../../Model/HealthTips';
import { Client } from '@stomp/stompjs';
import { MessageModel } from 'src/app/Model/message';
import * as SockJS from 'sockjs-client';
import { ConsultantServiceService } from 'src/app/services/consultant-service.service';
import { LoginuserService } from 'src/app/services/loginuser.service';
import { Mail } from './../../Model/Mail';
import { VideoService } from 'src/app/services/video.service';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogData } from '../consultantform/consultantform.component';
import { VedioDataShare } from 'src/app/Model/VedioDataShare';
import { CallrcvDialogComponent } from '../callrcv-dialog/callrcv-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

// const ClassicEditor = CKSource.ClassicEditor;
@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css']
})
export class DoctorDashboardComponent implements OnInit {

  apiChatBaseURl=environment.apiChatBaseURl;


  //// video call variables
  public isCallStarted$: Observable<boolean>;
  private peerId: string;
  doctorId: string;
  patientId: string;
  patientName: string;
  callStart = false;

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  ///////

    onlineDoctorArray:Array<Doctor>=[];
    doctorArray:Array<Doctor>=[];
    healthTipsArray:    Array<HealthTips>=[];
    condition:boolean=false;
    public doctors: Doctor[];
    // chatbot for doctor
    emailId=localStorage.getItem('email')
    private client: Client;
    public connected: boolean;
    public writingvalue: string;
    public clientId: string;
    public message: MessageModel = new MessageModel();
    public messages: any[] = [];
    public messgaeTyped:string="";
    messageto:string="";
    doctorDetails:Array<Doctor>;
    doctorName:String;
    doctorSpeciality:String;
  

    prefilledemail:Mail = new Mail();

    constructor(private snackBar: MatSnackBar,private http: HttpClient, private callService: VideoService, public dialog: MatDialog, private service: DoctorService, private consultantService: ConsultantServiceService, private loginservice: LoginuserService) {
      this.isCallStarted$ = this.callService.isCallStarted$;
      this.peerId = this.callService.initPeer(this.emailId);
      this.clientId = 'id-' + new Date().getTime() + '-' + Math.random().toString(36).substr(2);
    }
    ngOnInit(): void {


      this.prefilledemail.mail=localStorage.getItem('email');
      console.log(this.prefilledemail.mail);
    //   this.service.searchSpecificDoctor(this.prefilledemail.mail).subscribe(data=>{
    //     this.doctorDetails=data; 
    //     console.log("------------------------");
    //    this.doctorDetails.forEach(element => {
    //      if(element.email==this.prefilledemail.mail){
    //        this.doctorName=element.name.toString() ;
    //        this.doctorSpeciality=element.specialist.toString();
    //      }
    //    });
    //    console.log(this.doctorName+"-----"+this.doctorSpeciality);
       
    //     console.log(data);     
    //     console.log(this.doctorDetails)
    // },error=>{
    //     console.log(error)
    //   })



      this.prefilledemail.mail=localStorage.getItem('email');
      this.callService.localStream$
        .pipe(filter(res => !!res))
        .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);
      this.callService.remoteStream$
        .pipe(filter(res => !!res))
        .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream);
      // doctorchatbot
      console.log("--->" + this.messageto);
      this.client = new Client();
      this.client.webSocketFactory = () => {
        return new SockJS(this.apiChatBaseURl+'/chat');
      }
      this.client.onConnect = (frame) => {
        console.log('Connected: ' + this.client.connected + ' : ' + frame);
        this.connected = true;

        this.addDoctorUserPeer();
        this.client.subscribe('/topic/messages/' + this.emailId, e => {
          let message: MessageModel = JSON.parse(e.body) as MessageModel;
          message.date = new Date(message.date);
          this.messageto = message.username
          console.log("this is subscribe chat messga" + this.message);
          if (!this.message.color && message.type == "CONNECTED"
            && this.emailId == message.username) {
            this.message.color = message.color;
          }
          this.messages.push(message);
          this.message.message='';
        });
  
  
        this.client.subscribe('/topic/doctor/vedio/' + this.emailId, e => {
          const peerData: VedioDataShare = JSON.parse(e.body) as VedioDataShare;
          // message.date = new Date(message.date);
          console.log('peer data came after subscribe for doctor is of patient ' + peerData.id, peerData.username);
          this.patientId = peerData.id;
          this.patientName = peerData.username;
        });
  
            this.client.subscribe('/topic/writing', e => {
                console.log("this is subscribe chat writing ");
                this.writingvalue= e.body;
                setTimeout(() => this.writingvalue = '', 3000);
              });
              this.client.subscribe('/topic/history/' + this.messageto, e => {
                console.log("this is subscribe chat/history/ messgsing ");
                const history: MessageModel[] = JSON.parse(e.body) as MessageModel[];
                this.messages = history.map(m => {
                  m.date = new Date(m.date);
                  return m;
                }).reverse();
              });
              this.client.publish({destination: '/chat/history', body: this.messageto});
              this.message.type = "CONNECTED";
              this.client.publish({destination: '/chat/message', body: JSON.stringify(this.message)});
            }
            this.client.onDisconnect = ( frame ) => {
              console.log('Disconnected: ' + !this.client.connected + ' : ' + frame);
              this.message = new MessageModel();
              this.messages = [];
              this.connected = false;
            }
            this.client.activate();
            this.checkCallFromPatient();
    }

      isShow = false;
      toggleDisplay() {
        this.isShow = !this.isShow;
      }
      writing() {
        this.client.publish({destination: '/topic /writing', body: this.emailId});
      }
      send() {
        const  message={
          message:this.messgaeTyped,
          username:this.emailId,
          date : new Date().getTime(),
          type : "MESSAGE",
        };
        this.client.publish({destination: '/app/chat/'+this.messageto, body: JSON.stringify(message)});
        this.messages.push(message);
        console.log("doctor--->"+this.messages)
        this.message.message = '';
      }
     // End offff Doctorchatbot
    public healthTipsForm = new FormGroup( {
        // name: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
        adviceOn: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
        // specialist: new FormControl(null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
        tips: new FormControl('',[Validators.minLength(3),Validators.maxLength(100)]),
    } );
    public formDataPreview?: string;

   
     onSubmit(){
         console.log("i am submiitng")
        this.service.addHealthTips(this.healthTipsForm.value).subscribe((data)=>{
            console.log(data)
            this.healthTipsArray.push(data);
            this.condition=true;
            },(error)=>{
              console.log("Error!!!!!!")
            })
      }
      doctorOnline1: DoctorRedis = new DoctorRedis();
      makeMeOnline(){
        this.doctorOnline1.email=this.emailId;
        this.doctorOnline1.status="online";
        this.loginservice.updateStatusOnline(this.doctorOnline1).subscribe();
      }
      loggingOff(){
        this.doctorOnline1.email=this.emailId;
        this.doctorOnline1.status="online";
        this.loginservice.setStatusBusy(this.doctorOnline1).subscribe();
      }
    getallHealthTips(){
        console.log(this.healthTipsForm.value)
        this.service.getHealthTips().subscribe((data)=>{
        this.healthTipsArray=data;
        },(error)=>{
          console.log("Error!!!!!!")
        })
      }
    public reset(): void {
        this.healthTipsForm!.reset();
    }
    public get description(): AbstractControl {
        return this.healthTipsForm!.controls.description;
    }


    // get name() {
    //   return this. healthTipsForm.get('name');
    // }
  
    get adviceOn() {
      return this. healthTipsForm.get('adviceOn');
    }
    // get specialist() {
    //   return this. healthTipsForm.get('specialist');
    // }
    get tips() {
      return this. healthTipsForm.get('tips');
    } 
    
    

    ////// Vedio call code 
    public endCall() {
      this.callService.closeMediaCall();
    }
  
  
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
      this.callService.destroyPeer();
    }
  
    public showModal(joinCall: boolean): void {
      console.log('show modal get data is', joinCall);
      joinCall = true;
      this.callStart = true;
      console.log('patient id..............', this.patientId);
      const dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
      joinCall ? of(this.callService.establishMediaCall(this.patientId)) : of(this.callService.enableCallAnswer()).subscribe(_ => { });
  
      // const dialogRef = this.dialog.open(CallInfoDialogComponents, {
      //   width: '250px',
      //   data: dialogData
      // });
  
      // dialogRef.afterClosed()
      //   .pipe(
      //     switchMap(peerId =>
      //       joinCall ? of(this.callService.establishMediaCall(peerId)) : of(this.callService.enableCallAnswer())
      //     ),
      //   )
      //   .subscribe(_  => { });
    }
  
    addDoctorUserPeer() {
      const message = {
        id: this.peerId,
        username: this.emailId,
      };
      console.log('vedio call doctor to save is', message)
      this.client.publish({ destination: '/app/chat/vedio/adduser', body: JSON.stringify(message) });
    }
  
  
    checkCallFromPatient() {
      this.callService.peer.on('call', (data) => {
  
        if (!this.callStart) {
          const dialogRef = this.dialog.open(CallrcvDialogComponent, {
            width: '250px',
            data: { from: this.patientName, to: this.emailId, rcv: false }
          });
  
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
            // this.animal = result;
            if (result.rcv) {
              // this.callService.enableCallAnswer();
              of(this.callService.establishMediaCall(this.patientId)).subscribe(_ => { });
            }
          });
          console.log('data came from peer is................', data);
        }
  
      });
  
    }
    
}
