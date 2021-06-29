import { Requirements } from "../services/requirement";

export class MedicalRequest{

  
    id : Number;
    name:String;
    gender:String;
    phoneNumber:String;
    email:String;
     hospitalized:String;
     myCity:String;

    requirement:Array<Requirements> ;
//     Requirement requirement;

    uploadPrescription:String;
    status:String;
    type:String
}