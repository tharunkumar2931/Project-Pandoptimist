import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Model/Doctor';
import { HealthTips } from 'src/app/Model/HealthTips';
import { Mail } from 'src/app/Model/Mail';
import { DoctorService } from 'src/app/services/doctor.service';
import { OtpService } from 'src/app/services/otp.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tips: Array<HealthTips>;
  constructor(private router: Router, private doctorservice: DoctorService) { }
  ngOnInit(): void {
    this.doctorservice.getDoctorsTips().subscribe(
      resp => {
        this.tips = resp;
      }
    )
  }
}
