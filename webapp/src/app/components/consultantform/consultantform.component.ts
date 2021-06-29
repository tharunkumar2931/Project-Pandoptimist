import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ConsultantServiceService } from 'src/app/services/consultant-service.service';
import { DoctorRedis } from './../../Model/DoctorRedis';
import { Observable } from 'rxjs/internal/Observable';
import { Doctor } from 'src/app/Model/Doctor';
import { Client } from '@stomp/stompjs';
import { MessageModel } from 'src/app/Model/message';
import * as SockJS from 'sockjs-client';  
import { LoginuserService } from 'src/app/services/loginuser.service';
import { RouterService } from 'src/app/services/router.service';
import { VideoService } from 'src/app/services/video.service';
import { filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { VedioDataShare } from 'src/app/Model/VedioDataShare';
import { CallrcvDialogComponent } from '../callrcv-dialog/callrcv-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { Mail } from './../../Model/Mail';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
    peerId?: string;
    joinCall: boolean;
  }

@Component({
  selector: 'app-consultantform',
  templateUrl: './consultantform.component.html',
  styleUrls: ['./consultantform.component.css']
})
export class ConsultantformComponent implements OnInit {

  public apiIntialUrl = environment.apiChatBaseURl;

//// video call variables
public isCallStarted$: Observable<boolean>;
private peerId: string;

@ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
@ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;
private patientId: string;
// tslint:disable-next-line:ban-types
private doctorId: string;
private doctorName: string;
callStart = false;

///////



prefilledemail:Mail = new Mail();
  Display: boolean = false;
  public doctors: any;
  doctorsOnline: Array<DoctorRedis> = new Array<DoctorRedis>();
  pageSlice: any; 
  emailId=localStorage.getItem('email')
  private client: Client;
  public connected: boolean;
  public writingvalue: string;
  public clientId: string;
  public message: MessageModel = new MessageModel();
  public messages: any[] = [];
  public messgaeTyped : string = "";
  messageto:string = "";
  constructor(private snackBar: MatSnackBar,private service: ConsultantServiceService, public dialog: MatDialog, private callService: VideoService, private loginService: LoginuserService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
    this.peerId = this.callService.initPeer(this.emailId);
    console.log('id set is................................', this.peerId);
    this.patientId = this.peerId;
    this.clientId = 'id-' + new Date().getTime() + '-' + Math.random().toString(36).substr(2);
  }
  ngOnInit(): void {
  
    this.prefilledemail.mail=localStorage.getItem('email');
    this.callService.localStream$
    .pipe(filter(res => !!res))
    .subscribe(stream => this.localVideo.nativeElement.srcObject = stream);
  this.callService.remoteStream$
    .pipe(filter(res => !!res))
    .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream);
  this.getdoctors();
    // patientchatbot
    console.log("--->"+this.messageto);
    this.client = new Client();
    this.client.webSocketFactory= () => {
      return new SockJS(this.apiIntialUrl + '/chat');
    }
    this.client.onConnect = ( frame ) => {
      console.log('Connected: ' + this.client.connected + ' : ' + frame);
      this.connected = true;
      this.addPatientUserPeer();
      this.client.subscribe('/topic/messages/'+this.emailId, e => { 
        const message: MessageModel = JSON.parse(e.body) as MessageModel;
        message.date = new Date(message.date);
        console.log("this is subscribe chat messga"+this.message);
        if(!this.message.color && message.type == "CONNECTED" 
            && this.emailId == message.username) {
          this.message.color = message.color;
        }
        this.messages.push(message);
        this.message.message='';
      });


            /// Reciving message if there is any from vedio call participants like doctor peer id

            this.client.subscribe('/topic/patient/vedio/' + this.emailId, e => {
              const peerData: VedioDataShare = JSON.parse(e.body) as VedioDataShare;
              // message.date = new Date(message.date);
              console.log('peer data came after subscribe is for doctor with id ' + peerData.id, peerData.username);
              this.doctorId = peerData.id;
              this.doctorName = peerData.username;
              // if (!this.message.color && message.type == 'CONNECTED'
              //   && this.emailId == message.username) {
              //   this.message.color = message.color;
              // }
              // this.messages.push(message);
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

    this.checkCallFromDoctor();
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
      id: this.patientId
    };
    this.client.publish({destination: '/app/chat/'+this.messageto, body: JSON.stringify(message)});
    this.messages.push(message);
    console.log("patient--"+this.messages)
    this.message.message = '';
  }
 // End offff Patientchatbot
  onPageChange(event: PageEvent) {
    const startInd = event.pageIndex * event.pageSize;
    let endInd = startInd + event.pageSize;
    if (endInd > this.doctorsOnline.length) {
      endInd = this.doctorsOnline.length;
    }
    this.pageSlice = this.doctorsOnline.slice(startInd, endInd);
  }

  getdoctors() {
    this.service.getAllDoctorsOnline().subscribe(
      (data) => {
        this.doctorsOnline = data;
        this.pageSlice= this.doctorsOnline.slice(0, 16);
        error => {
          this.Display = true;
        }
      });
  }


  public endCall() {
    this.callService.closeMediaCall();
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.callService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    joinCall = true;
    this.callStart = true;
    const dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    joinCall ? of(this.callService.establishMediaCall(this.doctorId)) : of(this.callService.enableCallAnswer()).subscribe(_ => { });

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

  addPatientUserPeer() {
    const message = {
      id: this.peerId,
      username: this.emailId,
    };
    this.client.publish({ destination: '/app/chat/vedio/adduser', body: JSON.stringify(message) });
  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action);
}
  connectAvilable(doctor) {
    console.log(doctor);
    this.messageto = doctor.email;
    this.service.doctorEngaged = doctor;
    console.log(this.service.doctorEngaged);
    // this.showModal(true);
    this.openSnackBar('Your connected, Start chart or Vedio Service', 'Dismiss')
    this.client.publish({ destination: '/app/chat/vedio/' + this.messageto, body: this.emailId });
    this.loginService.setStatusBusy(doctor).subscribe();
    this.getdoctors();
  }

  checkCallFromDoctor() {
    this.callService.peer.on('call', (data) => {
      console.log('data for call is........', data)
      if (!this.callStart) {
        const dialogRef = this.dialog.open(CallrcvDialogComponent, {
          width: '250px',
          data: { from: this.doctorName, to: this.emailId, rcv: false }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed', result);
          // this.animal = result;
          if (result.rcv) {
            // this.callService.enableCallAnswer();
            of(this.callService.establishMediaCall(this.doctorId)).subscribe(_ => { });
          }
        });
        console.log('data came from peer is................', data);
      }


    });

  }
}









