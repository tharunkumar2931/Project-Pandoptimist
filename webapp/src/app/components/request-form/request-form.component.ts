import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Patient } from 'src/app/Model/patient';
import { PatientServiceService } from 'src/app/services/patient-service.service';
import { Mail } from 'src/app/Model/Mail';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

interface Gender {
  genderType: string;
  genderValue: string;
}
interface Hospitalized {
  hospitalizedType: string;
  hospitalizedValue: string;
}

interface requirmentType {
  requestType:string;
  requestValue:String;

}

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})

export class RequestFormComponent implements OnInit {
  condition: boolean = false;
  selectedFile: any;
  message: string;
  public RequestList!: FormArray;
  imageURL: string;

  options: string[] = cities;
  suggestions: string[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  myemail: Mail = new Mail();
  prefilledemail: Mail = new Mail();

  genderGroups: Gender[] = [
    { genderType: 'Male', genderValue: 'Male' },
    { genderType: 'Female', genderValue: 'Female' },
  ];
  hospitalizedGroups: Hospitalized[] = [
    { hospitalizedType: 'Yes', hospitalizedValue: 'Yes' },
    { hospitalizedType: 'No', hospitalizedValue: 'No' },
  ];
  requirmentTypeGroup: requirmentType[] = [
    { requestType: 'Medicine', requestValue: 'Medicine' },
    { requestType: 'Bed', requestValue: 'Bed' },
    { requestType: 'Equipment', requestValue: 'Equipment' }
   
  ];

  get contactFormGroup() {
    return this.patientForm.get('requirement') as FormArray;
  }

  ngOnInit(): void {
    this.prefilledemail.mail = localStorage.getItem('email');
    this.RequestList = this.patientForm.get('requirement') as FormArray;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  constructor(private snackBar: MatSnackBar, private service: PatientServiceService, private fb: FormBuilder, private http: HttpClient) { }
  public patientArray: Patient[][];
  public patientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]],
    gender: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.maxLength(10),
    Validators.pattern('(0/91)?[7-9][0-9]{9}')]],
    email: [],
    hospitalized: ['', [Validators.required]],
    type: ['', [Validators.required]],
    myCity:[null , [Validators.required]],
    requirement: this.fb.array([this.createContact()]),
    uploadPrescription: [''],

  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const arrayCity = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()

    this.myCity.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }



  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }




  createContact(): FormGroup {
    return this.fb.group({

      requirementName: [null, Validators.compose([Validators.required])],
      quantity: [null, Validators.compose([Validators.required])],
      unitOfMeasure: [null, Validators.required]
    });
  }


  addRequest() {
    this.RequestList.push(this.createContact());
  }


  removeRequest(index: number) {

    this.RequestList.removeAt(index);
  }


  getContactsFormGroup(index: any): FormGroup {

    const formGroup = this.RequestList.controls[index] as FormGroup;
    return formGroup;
  }


  onSubmit() {
    if (!this.patientForm.valid) {
      this.openSnackBar('Please fill the form', 'Dismiss')
    }
    else {
      this.condition = true;
      this.patientForm.get('email').setValue(this.prefilledemail.mail);
      this.service.addRequest(this.patientForm.value).subscribe(data => {
        console.log(data);
      })

    }
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


  onclick() {
    this.patientForm.reset();
    this.condition = false;

  }
  get name() { return this.patientForm.get('name') }
  get gender() { return this.patientForm.get('gender') }
  get phoneNumber() { return this.patientForm.get('phoneNumber') }
  phoneNumberpattern = "^((\\+91-?)|0)?[0-9]{10}$";
  // get email() { return this.patientForm.get('email') }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  get hospitalized() { return this.patientForm.get('hospitalized') }
  // get city() { return this.patientForm.get('city') }
  get uploadPrescription() { return this.patientForm.get('uploadPrescription') }
  get myCity() { return this.patientForm.get('myCity') }
  get type() { return this.patientForm.get('type') }


}

