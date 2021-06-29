import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PlasmarequestService } from 'src/app/services/plasmarequest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { PlasmaRequest } from 'src/app/services/request';
interface BloodGroup {
  bloodType: string;
  bloodName: string;
}
@Component({
  selector: 'app-plasma-request',
  templateUrl: './plasma-request.component.html',
  styleUrls: ['./plasma-request.component.css']
})
export class PlasmaRequestComponent implements OnInit {
  bloodGroups: BloodGroup[] = [
    { bloodType: 'A+', bloodName: 'A+' },
    { bloodType: 'A-', bloodName: 'A-' },
    { bloodType: 'B+', bloodName: 'B+' },
    { bloodType: 'B-', bloodName: 'B-' },
    { bloodType: 'AB+', bloodName: 'AB+' },
    { bloodType: 'AB-', bloodName: 'AB-' },
    { bloodType: 'O-', bloodName: 'O-' },
    { bloodType: 'O+', bloodName: 'O+' },
  ];
  selectedFile: any;
  message: string;
  errors = errorMessages;
  button:boolean=true;
  condition:boolean = false;
  nodata:boolean = false;
  donor:boolean=false;
  donars: any;
  imageURL: string;
  options: string[] = cities;
  suggestions: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(private snackBar:MatSnackBar,private service: PlasmarequestService, private fb: FormBuilder, private http: HttpClient) { }
  public DonarArray: PlasmaRequest[][];
  openSnackBar(message, action){
    this.snackBar.open(message,action);
  }
  public donarForm = this.fb.group({
    name: [null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]],
    age: [null, [Validators.required,Validators.minLength(2), Validators.pattern('[0-9][0-9]')]],
    bloodGroup: [null, [Validators.required]],
    hospitalName: [null, [Validators.required, Validators.minLength(3),Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$')]],
    myCity:[null , [Validators.required]],
    uploadPrescription: [""],
  })
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  requestSubmit() {
    if (!this.donarForm.valid) {
      this.openSnackBar('Please fill the form','Dismiss')
    }
    else {
      this.service.addPlasmaRequest(this.donarForm.value).subscribe(data => {
        console.log(data);
        this.openSnackBar('Request is sent succesfully','Dismiss')
        this.button=false;
        this.donor=true;
      })
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
   const arrayCity=this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()
   
    this.myCity.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  

  getDonars(bloodGroup:any,myCity:any) { 
    this.condition = true;
     this.service.getDonar(this.bloodGroup.value,this.myCity.value).subscribe(data => {
       this.donars = data;
       if(this.donars.length!=0){
         this.bloodGroup;
         this.myCity;
       }else{
         this.nodata=true;
       }
     })
   }
  offclick(){
    this.donarForm.reset();
    this.condition=false;
    this.button=true;
    this.donor=false;
    this.nodata=false;
  }
  onclick(id){
    this.donarForm.reset();
    this.condition=false;
    this.button=true;
    this.donor=false;
    this.service.deleteDonor(id).subscribe(data => {
    });
  }
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)
    const reader = new FileReader();
    reader.onload = () => {
        this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  
  get name() { return this.donarForm.get('name') }
  get uploadPrescription() { return this.donarForm.get('uploadPrescription') }
  get age() { return this.donarForm.get('age') }
  get bloodGroup() { return this.donarForm.get('bloodGroup') }
  get hospitalName() { return this.donarForm.get('hospitalName') }
  get myCity() { return this.donarForm.get('myCity') }
}
export const errorMessages: { [key: string]: string } = {
  name: 'Full name must be between 1 and 20 characters',
  age: 'Please Enter Correct Age',
  phoneNumber: 'Please provide correct mobile number (length should be 10)',
  hospitalName: 'Please enter Correct Hospital Name',
 city: 'Please enter Correct City name'
};