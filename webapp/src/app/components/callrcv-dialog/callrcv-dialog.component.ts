import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vedio } from 'src/app/Model/Vedio';


@Component({
  selector: 'app-callrcv-dialog',
  templateUrl: './callrcv-dialog.component.html',
  styleUrls: ['./callrcv-dialog.component.css']
})
export class CallrcvDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CallrcvDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vedio,
    // tslint:disable-next-line:align
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onClick(callStatus: boolean) {
    console.log('call status is', callStatus);
    this.data.rcv = callStatus;
    this.dialogRef.close(this.data);
  }

}
