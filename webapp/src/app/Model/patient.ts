import { Requirements } from "../services/requirement";


export class Patient{
   
    
    public name :String;
    public gender:String;
    public phoneNumber:String;
    public email :String;
    public hospitalized:String;
    public myCity:String;
    public requirement: Requirements=new Requirements();
    public uploadPrescription:String;
    public type:String;
    
    
}