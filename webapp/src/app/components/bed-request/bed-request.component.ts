import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bed } from 'src/app/Model/Bed';
import { Resource } from 'src/app/Model/Resource';
import { BedResourceService } from 'src/app/services/bed-resource.service';
import { ResourceService } from 'src/app/services/resource.service';
import { cities } from './../../Model/cities-state';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

interface BedType {
  bedType: string;

}

interface AllBedType {
  typeOfBeds: string;

}

@Component({
  selector: 'app-bed-request',
  templateUrl: './bed-request.component.html',
  styleUrls: ['./bed-request.component.css']
})
export class BedRequestComponent implements OnInit {
  BedArray: Array<Resource> = [];
  resource: Resource = new Resource();
  // ResourceArray:Array<Resource>=[];
  allbedTypes: AllBedType[] = [
    { typeOfBeds: 'Normal Bed' },
    { typeOfBeds: 'Bed with ventilator' },
    { typeOfBeds: 'Bed with oxygen' },

  ];

  bedTypes: BedType[] = [
    { bedType: 'Bed' }

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

  ngOnInit(): void {
    this.filteredOptions = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))

    );

  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action);
  }

  BedResourceForm = new FormGroup({
    // createdBy:new FormControl(null,[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
    type: new FormControl('', Validators.required),
    bedType: new FormControl('', Validators.required),
    // city:new FormControl('', [Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),
    avalabilityPlace: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9 ]+$')]),
    contactPersonName: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z ]+$')]),
    contactMobileNumber: new FormControl('', [Validators.required, Validators.maxLength(10),
    Validators.pattern('(0/91)?[7-9][0-9]{9}')]),
    isVerified: new FormControl(''),
    // verifiedBy:new FormControl('',[Validators.required, Validators.minLength(3),Validators.pattern('^[a-zA-Z ]+$')]),

  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const arrayCity = this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0).toString()

    this.avalabilityPlace.setValue(arrayCity)
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);

  }

  // get createdBy() {
  //   return this.BedResourceForm.get('createdBy')
  // }
  // get city() {
  //   return this.BedResourceForm.get('city')
  // }
  // get verifiedBy() {
  //   return this.BedResourceForm.get('verifiedBy');
  // }


  get type() {
    return this.BedResourceForm.get('type')
  }
  get bedType() {
    return this.BedResourceForm.get('bedType')
  }

  get avalabilityPlace() {
    return this.BedResourceForm.get('avalabilityPlace')
  }
  get address() {
    return this.BedResourceForm.get('address')
  }
  get contactPersonName() {
    return this.BedResourceForm.get('contactPersonName')
  }
  get contactMobileNumber() {
    return this.BedResourceForm.get('contactMobileNumber')
  }
  get isVerified() {
    return this.BedResourceForm.get('isVerified');
  }


  registerBed() {

    console.log(this.BedResourceForm.value)
    if (!this.BedResourceForm.valid) {
      this.openSnackBar('Please fill the form', 'Dismiss')
    } else {


      this.service.addResource(this.BedResourceForm.value).subscribe((data) => {
        this.BedArray.push(data)
        this.resource = new Resource();
        this.openSnackBar('Thanks for adding the resource!!', 'Dismiss')
        this.BedResourceForm.reset(" ");
        //  this.BedResourceForm.get('createdBy').clearValidators();
        //  this.BedResourceForm.get('verifiedBy').clearValidators();
        //  this.BedResourceForm.get('city').clearValidators();
        this.BedResourceForm.get('type').clearValidators();
        this.BedResourceForm.get('type').updateValueAndValidity();
        this.BedResourceForm.get('bedType').clearValidators();
        this.BedResourceForm.get('bedType').updateValueAndValidity();
        this.BedResourceForm.get('avalabilityPlace').clearValidators();
        this.BedResourceForm.get('address').clearValidators();
        this.BedResourceForm.get('contactPersonName').clearValidators();
        this.BedResourceForm.get('contactMobileNumber').clearValidators();
        this.BedResourceForm.get('isVerified').clearValidators();
        // this.BedResourceForm.get('isVerified').clearValidators();

      }, error => {
        console.log("Error in Bed service")
      })

    }
  }

  getBeds() {
    console.log(this.BedResourceForm.value)
    this.service.getResources().subscribe((data) => {
      this.BedArray = data;
    }, (error) => {
      console.log("Error in Bed service")
    })
  }
}
