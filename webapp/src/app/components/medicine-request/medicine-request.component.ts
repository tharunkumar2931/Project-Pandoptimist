import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medicine } from 'src/app/Model/Medicine';
import { MedicineResourceService } from 'src/app/services/medicine-resource.service';
import { ResourceService } from 'src/app/services/resource.service';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
interface type {
  medicineType: string;

}
@Component({
  selector: 'app-medicine-request',
  templateUrl: './medicine-request.component.html',
  styleUrls: ['./medicine-request.component.css']
})
export class MedicineRequestComponent implements OnInit {
  gettype: type[] = [
    { medicineType: 'Medicine' }

  ];
  options: string[] = cities;
  suggestions: string[] = [];
  city = new FormControl();
  filteredOptions: Observable<string[]>;
  MedicineArray: Array<Medicine> = [];
  marked = false;
  theCheckbox = false;

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private service: ResourceService) { }

  toggleVisibility(e) {
    this.marked = e.target.checked;
  }


  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );
  }

  MedicineResourceForm = new FormGroup({
    // createdBy: new FormControl(null,[Validators.required, Validators.minLength(4),Validators.pattern('^[a-zA-Z ]+$')]),
    // city: new FormControl(null,[Validators.required, Validators.minLength(4),Validators.pattern('^[a-zA-Z ]+$')]),
    // verifiedBy:new FormControl(''),
    type: new FormControl('', Validators.required),
    medicineName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]),
    avalabilityPlace: new FormControl(null, [Validators.required]),
    contactPersonName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]),
    contactMobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10),
    Validators.pattern('(0/91)?[7-9][0-9]{9}')]),
    isVerified: new FormControl(''),
    address: new FormControl('', [Validators.required, Validators.minLength(3), , Validators.pattern('^[a-zA-Z0-9 ]+$')])

  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const arrayCity = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()

    this.avalabilityPlace.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }



  // get createdBy() {
  //   return this.MedicineResourceForm.get('createdBy');
  // }

  // get city() {
  //   return this.MedicineResourceForm.get('city');
  // }
  // get verifiedBy() {
  //   return this.MedicineResourceForm.get('verifiedBy');
  // }

  get type() {
    return this.MedicineResourceForm.get('type');
  }
  get medicineName() {
    return this.MedicineResourceForm.get('medicineName');
  }

  get avalabilityPlace() {
    return this.MedicineResourceForm.get('avalabilityPlace');
  }
  get address() {
    return this.MedicineResourceForm.get('address');
  }
  get contactPersonName() {
    return this.MedicineResourceForm.get('contactPersonName');
  }
  get contactMobileNumber() {
    return this.MedicineResourceForm.get('contactMobileNumber');
  }
  get isVerified() {
    return this.MedicineResourceForm.get('isVerified');
  }


  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }
  registerMedicine() {
    console.log(this.MedicineResourceForm.value)
    console.log("aaaaaa" + this.MedicineResourceForm.get('isVerified').value)
    if (!this.MedicineResourceForm.valid) {
      this.openSnackBar('Please fill the form', 'Dismiss')

    } else {

      this.service.addResource(this.MedicineResourceForm.value).subscribe((data) => {
        this.MedicineArray.push(data)
        this.openSnackBar('Thanks for adding the resource!!', 'Dismiss')
        this.MedicineResourceForm.reset(" ");
        // this.MedicineResourceForm.get('createdBy').clearValidators();
        this.MedicineResourceForm.get('type').clearValidators();
        this.MedicineResourceForm.get('type').updateValueAndValidity();
        this.MedicineResourceForm.get('medicineName').clearValidators();
        this.MedicineResourceForm.get('medicineName').updateValueAndValidity();
        // this.MedicineResourceForm.get('city').clearValidators();
        this.MedicineResourceForm.get('avalabilityPlace').clearValidators();
        this.MedicineResourceForm.get('address').clearValidators();
        this.MedicineResourceForm.get('contactPersonName').clearValidators();
        this.MedicineResourceForm.get('contactMobileNumber').clearValidators();
        this.MedicineResourceForm.get('isVerified').clearValidators();
        // this.MedicineResourceForm.get('verifiedBy').clearValidators();
      }, error => {
        console.log("Error in Medicine service")
      })
    }
  }
  getMedicines() {
    console.log(this.MedicineResourceForm.value)

    this.service.getResources().subscribe((data) => {
      this.MedicineArray = data;
    }, (error) => {
      console.log("Error in Medicne service")
    })
  }
}
