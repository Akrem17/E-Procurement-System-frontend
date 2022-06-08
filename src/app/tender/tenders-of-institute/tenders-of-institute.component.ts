import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_FILTERS } from 'src/app/Shared/Models/TENDER_FILTERS';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-tenders-of-institute',
  templateUrl: './tenders-of-institute.component.html',
  styleUrls: ['./tenders-of-institute.component.css']
})
export class TendersOfInstituteComponent implements OnInit {


  data: TENDER[] = []
  tenders: TENDER[] = []
  itemPerPage: number = 5
  page: number = 0
  totalRecords: number;
  filters!:FormGroup;

  constructor(private tenderService: TenderService, private instuteService: InstituteService,private fb: FormBuilder ,private route: ActivatedRoute) { }

  isEmptyOrNull(str:string| null):boolean{
    if(str=="" || str==null)return true;
    return false;
    
  
  }
  isEmpty(filter:TENDER_FILTERS):boolean{
    return true;
    if (filter==null) return true
    return false;
  }
  
callTendersWithFilters(filters:TENDER_FILTERS){
  
  this.tenderService.FilterTenderBy(filters).subscribe(res=>{
    this.data=[]
   
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    this.tenders = response.data;
    this.tenders?.map(tender => {
      let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
      let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
      tender.startDate = startDate;
      tender.deadLine = deadLine;
      this.data=this.tenders;
  })

  })
}


callAllTenders(id:string){
  this.instuteService.GetTendersOfInstitute(id,this.page,this.itemPerPage).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    console.log(response)
    this.tenders = response.data?.tenders;
    this.totalRecords=response.data.items;
    this.tenders?.map(tender => {
      let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
      let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
      tender.startDate = startDate;
      tender.deadLine = deadLine;
      this.data=this.tenders;

  })

})

  
}
  ngOnInit(): void {
    let  id = this.route.snapshot.paramMap.get("id");

    this.filters = this.fb.group({
      bidNumber: ["", [Validators.required]],
      bidName: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postDate: ["", [Validators.required]],
  
    });

    

    this.filters.get("bidNumber").valueChanges.subscribe(selectedValue => {

      let filters: TENDER_FILTERS;
      filters = this.filters.value;
      filters.bidNumber = selectedValue;
      //filters.postDate = new Date(filters.postDate )?.toISOString()
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }
      if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber) &&this.isEmptyOrNull(filters?.city)  && this.isEmptyOrNull(filters?.postDate))) {

        this.callTendersWithFilters(filters)
      }
      else {
        this.callAllTenders(id)
      }
    })


    this.filters.get("bidName").valueChanges.subscribe(selectedValue => {
      let filters: TENDER_FILTERS;
      filters = this.filters.value;
      filters.bidName = selectedValue;
      //filters.postDate = new Date(filters.postDate )?.toISOString()
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }

      if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber)&& this.isEmptyOrNull(filters?.city)  && this.isEmptyOrNull(filters?.postDate))) {

        this.callTendersWithFilters(filters)
      }
      else {
        this.callAllTenders(id)
      }
    })
    this.filters.get("city").valueChanges.subscribe(selectedValue => {
      let filters: TENDER_FILTERS;
      filters = this.filters.value;
      filters.city = selectedValue;
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }
      if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber)  && this.isEmptyOrNull(filters?.city)  && this.isEmptyOrNull(filters?.postDate) )) {
        this.callTendersWithFilters(filters)
      }
      else {
        this.callAllTenders(id)
      }



    })
    
    this.filters.get("postDate").valueChanges.subscribe(selectedValue => {
      let filters: TENDER_FILTERS;
      filters = this.filters.value;
      if(selectedValue!=""){
      filters.postDate = selectedValue;
      
      filters.postDate = new Date(filters.postDate )?.toISOString()
    }else{
      filters.postDate=''
    }
      if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber)  && this.isEmptyOrNull(filters?.city) && this.isEmptyOrNull(filters?.postDate))) {
        this.callTendersWithFilters(filters)
      }
      else {
        this.callAllTenders(id)
      }
    })
  
  



    this.instuteService.GetTendersOfInstitute(id,this.page,this.itemPerPage).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tenders = response.data?.tenders;
      this.totalRecords=response.data.items;
      this.tenders?.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data=this.tenders;

    })

  })

}
clearDate(){
  this.filters.get("postDate").setValue('');
  console.log(this.filters.value)
}

  onChangePage(event: PageEvent) {
    this.data=[]
    this.itemPerPage = event.pageSize
    this.page = (event.pageIndex + 1)*this.itemPerPage;
    let  id = this.route.snapshot.paramMap.get("id");
    console.log(this.page,this.itemPerPage)
    this.instuteService.GetTendersOfInstitute(id,this.page,this.itemPerPage,).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response)
      this.tenders = response.data?.tenders;
      this.tenders?.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data=this.tenders;

    })

  })
     

   
}




}
