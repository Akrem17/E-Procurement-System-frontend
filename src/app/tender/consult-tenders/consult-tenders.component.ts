import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_FILTERS } from 'src/app/Shared/Models/TENDER_FILTERS';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-consult-tenders',
  templateUrl: './consult-tenders.component.html',
  styleUrls: ['./consult-tenders.component.css']
})
export class ConsultTendersComponent implements OnInit {
  data: TENDER[] = []
  tenders: TENDER[] = []
  itemPerPage: number = 5
  page: number = 0
  totalRecords: number;
  filters!: FormGroup;
  constructor(private fb: FormBuilder, private tenderService: TenderService, private instuteService: InstituteService) { }


  callAllTenders() {
    this.tenderService.getTenders(this.page, this.itemPerPage).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tenders = response.data.tenders;
      this.totalRecords = response.data.items;
      this.tenders?.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data = this.tenders;

      })
    })


  }
  ngOnInit(): void {
    this.callAllTenders()

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
        this.callAllTenders()
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
        this.callAllTenders()
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
        this.callAllTenders()
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
        this.callAllTenders()
      }
    })

  }

  clearDate(){
    this.filters.get("postDate").setValue('');
    console.log(this.filters.value)
    
  }

  callTendersWithFilters(filters: TENDER_FILTERS) {
    this.tenderService.FilterTenderBy(filters).subscribe(res => {

      this.data = [];
      
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.tenders = response.data;
      this.tenders?.map(tender => {

        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data = this.tenders;

      })

    })
  }

  applyFilters(form) {
  }




  onChangePage(event: PageEvent) {
    this.data = []

    this.itemPerPage = event.pageSize
    this.page = event.pageIndex * event.pageSize


    this.tenderService.getTenders(this.page, this.itemPerPage).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tenders = response.data.tenders;
      this.totalRecords = response.data.items;
      this.tenders.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data = this.tenders;

      })
    })



  }

  isEmptyOrNull(str: string | null): boolean {
    if (str == "" || str == null) return true;
    return false;


  }
  isEmpty(filter: TENDER_FILTERS): boolean {
    return true;
    if (filter == null) return true
    return false;
  }



}
