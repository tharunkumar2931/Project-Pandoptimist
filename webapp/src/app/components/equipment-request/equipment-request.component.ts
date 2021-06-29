import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MedicalEquipment } from 'src/app/Model/MedicalEquipment';
import { MedicalEquipmentResourceService } from 'src/app/services/medical-equipment-resource.service';
import { ResourceService } from 'src/app/services/resource.service';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
interface type {
  medicalType: string;

}

interface AllEquipmentType {
  typeOfMedicalEquipment: string;

}
@Component({
  selector: 'app-equipment-request',
  templateUrl: './equipment-request.component.html',
  styleUrls: ['./equipment-request.component.css']
})
export class EquipmentRequestComponent implements OnInit {
  gettype: type[] = [
    { medicalType: 'Equipments' }

  ];
  EquipmentsArray: Array<MedicalEquipment> = [];
  allEquipmentTypes: AllEquipmentType[] = [
    { typeOfMedicalEquipment: 'Diagnostic equipment' },
    { typeOfMedicalEquipment: 'Therapeutic equipment' },
    { typeOfMedicalEquipment: 'Surgical instruments' },
    { typeOfMedicalEquipment: 'Durable medical equipment' },
    { typeOfMedicalEquipment: 'Biomedical equipment' },
    { typeOfMedicalEquipment: 'Oxygen Cylinders' },

  ];
  options: string[] = cities;
  suggestions: string[] = [];
  city = new FormControl();
  filteredOptions: Observable<string[]>;
  marked = false;
  theCheckbox = false;

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private service: ResourceService) { }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }
  s

  ngOnInit(): void {

    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );


  }

  EquipmentResourceForm = new FormGroup({
    // createdBy:new FormControl(null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
    // city:new FormControl(null,[Validators.required, Validators.minLength(4),Validators.pattern('^[a-zA-Z ]+$')]),
    // verifiedBy:new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
    type: new FormControl('', Validators.required),
    typeofEquipment: new FormControl('', Validators.required),
    medicalEquipmentName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
    avalabilityPlace: new FormControl(null, [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), , Validators.pattern('^[a-zA-Z0-9 ]+$')]),
    contactPersonName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
    contactMobileNumber: new FormControl('', [Validators.required,
    Validators.pattern('(0/91)?[7-9][0-9]{9}')
    ]),
    isVerified: new FormControl(''),

  });
  clearForm() {
    console.log("clear")
    this.EquipmentResourceForm.reset();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const arrayCity = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()
    this.avalabilityPlace.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }
  // get createdBy() {
  //   return this.EquipmentResourceForm.get('createdBy');
  // }
  // get isVerified() {
  //   return this.EquipmentResourceForm.get('isVerified');
  // }
  // get city() {
  //   return this.EquipmentResourceForm.get('city');
  // }

  get type() {
    return this.EquipmentResourceForm.get('type');
  }
  get typeofEquipment() {
    return this.EquipmentResourceForm.get('typeofEquipment');
  }
  get medicalEquipmentName() {
    return this.EquipmentResourceForm.get('medicalEquipmentName');
  }

  get avalabilityPlace() {
    return this.EquipmentResourceForm.get('avalabilityPlace');
  }
  get address() {
    return this.EquipmentResourceForm.get('address');
  }
  get contactPersonName() {
    return this.EquipmentResourceForm.get('contactPersonName');
  }
  get contactMobileNumber() {
    return this.EquipmentResourceForm.get('contactMobileNumber');
  }

  get isVerified() {
    return this.EquipmentResourceForm.get('isVerified');
  }
  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }
  public reset(): void {
    this.EquipmentResourceForm!.reset();
  }
  registerEquipments() {
    console.log(this.EquipmentResourceForm.value)
    if (!this.EquipmentResourceForm.valid) {
      this.openSnackBar('Please fill the form', 'Dismiss')
    } else {
      this.service.addResource(this.EquipmentResourceForm.value).subscribe((data) => {
        this.EquipmentsArray.push(data)
        this.openSnackBar('Thanks for adding the resoures!!', 'Dismiss')
        this.EquipmentResourceForm.reset(" ");
        // this.EquipmentResourceForm.get('createdBy').clearValidators();
        // this.EquipmentResourceForm.get('verifiedBy').clearValidators();
        // this.EquipmentResourceForm.get('city').clearValidators();
        this.EquipmentResourceForm.get('type').clearValidators();
        this.EquipmentResourceForm.get('type').updateValueAndValidity();
        this.EquipmentResourceForm.get('typeofEquipment').clearValidators();
        this.EquipmentResourceForm.get('typeofEquipment').updateValueAndValidity();
        this.EquipmentResourceForm.get('avalabilityPlace').clearValidators();
        this.EquipmentResourceForm.get('address').clearValidators();
        this.EquipmentResourceForm.get('contactPersonName').clearValidators();
        this.EquipmentResourceForm.get('contactMobileNumber').clearValidators();
        this.EquipmentResourceForm.get('isVerified').clearValidators();

      }, error => {
        console.log("Error in Equipment service")
      })
    }
  }
  getEquipments() {
    console.log(this.EquipmentResourceForm.value)
    this.service.getResources().subscribe((data) => {
      this.EquipmentsArray = data;
    }, (error) => {
      console.log("Error in Bed service")
    })
  }
}
