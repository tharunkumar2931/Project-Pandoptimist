import { Component, OnInit } from '@angular/core';
import { VolunteerInteraction } from 'src/app/Model/VolunteerInteraction';
import { VolunteerScore } from 'src/app/Model/VolunteerScore';
import { SOSRequestService } from 'src/app/services/sosrequest.service';

@Component({
  selector: 'app-volunteer-score',
  templateUrl: './volunteer-score.component.html',
  styleUrls: ['./volunteer-score.component.css']
})
export class VolunteerScoreComponent implements OnInit {

  // volunteerScore:VolunteerScore;
  // volunteerInteratcion: VolunteerInteraction;
  allScore: Array<VolunteerScore> = [];
  constructor(private service: SOSRequestService) { }

  ngOnInit(): void {
    console.log("Inside Score!!!!!!!!!!!!!")
    this.getVolunteerScores();
  }

getVolunteerScores(){
  this.service.getScores().subscribe(data=>{
    this.allScore=data;
    console.log(this.allScore)
  },error=>{
    console.log(error)
  })
}
}
