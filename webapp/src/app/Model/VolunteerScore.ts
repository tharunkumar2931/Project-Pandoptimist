import { VolunteerInteraction } from "./VolunteerInteraction";

export class VolunteerScore{

    id:Number;
     volunteerEmailId:String;
    name:String;
     totalScore:Number;
    volunteerLevel:String;
   rewardPerTenScore:Number;
   monitoryValue:Number;
   volunteerInteractions: Array<VolunteerInteraction> ;
}