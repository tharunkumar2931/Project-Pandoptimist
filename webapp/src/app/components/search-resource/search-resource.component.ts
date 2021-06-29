import { Component, OnInit,Input } from '@angular/core';
import { SearchData } from 'src/app/Model/DataToSearch';
import { Resource } from 'src/app/Model/Resource';
import { ResourceService } from 'src/app/services/resource.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resource.component.html',
  styleUrls: ['./search-resource.component.css']
})
export class SearchResourceComponent implements OnInit {

  resourceName="";
  cityName="";

  // resourceName:String;
  // cityName:String;
  resultArray: Array<Resource> = [];
  searchResult: boolean =false;


  @Input() searchingData: SearchData
  constructor(private service:ResourceService,private shared:SharedService) { }

  ngOnInit(): void {
    // this.getParentData();
  }

  getParentData(){
    console.log("search--"+this.searchingData.resource+"    "+this.searchingData.location);
  }
  
  search(){
    // this.resourceName=this.shared.getResource();
    // this.cityName=this.shared.getLocation();
    // console.log("search--"+this.searchingData.resource+"    "+this.searchingData.location);
    this.service.searchResource(this.searchingData.resource,this.searchingData.location).subscribe(data=>{
      this.searchResult=false;
      console.log("%%%%%%%%%%%%"+data);
      this.resultArray=data;
      if(this.resultArray.length!=0){
        this.resourceName='';
        this.cityName='';
      }else{
        this.searchResult=true;
      console.log(this.resultArray);
      this.resourceName='';
      this.cityName='';
    }},error=>{
      console.log(error)
    })
  }


  // search(){
  //   console.log(this.resourceName+" "+this.cityName);
  //   this.service.searchResource(this.resourceName,this.cityName).subscribe(data=>{
  //     console.log("%%%%%%%%%%%%"+data);
  //     this.resultArray=data;
  //     if(this.resultArray.length!=0){
  //       this.resourceName='';
  //       this.cityName='';
  //     }else{
  //       this.searchResult=true;
  //     console.log(this.resultArray);
  //     this.resourceName=" ";
  //     this.cityName=" ";
  //     this.ngOnInit();
  //   }},error=>{
  //     console.log(error)
  //     this.ngOnInit();
  //   })
  // }

  clear(){
    console.log("Inside clear")
    this.ngOnInit();
  }
  
}
