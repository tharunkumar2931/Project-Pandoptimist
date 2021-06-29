import { Component, OnInit } from '@angular/core';
import { LoginuserService } from 'src/app/services/loginuser.service';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css']
})
export class DonorDashboardComponent implements OnInit {

  constructor(private loginService: LoginuserService) { }

  ngOnInit() {
  }

  
}
