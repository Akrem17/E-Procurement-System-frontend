import { Component, OnInit } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
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

  constructor(private tenderService: TenderService, private instuteService: InstituteService) { }

  ngOnInit(): void {
    this.tenderService.getTenders(this.page, this.itemPerPage).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tenders = response.data.tenders;
      console.log(response)
      this.totalRecords = response.data.items;
      console.log(this.totalRecords)
      this.tenders?.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data=this.tenders;

    })
  })

}



  
  onChangePage(event: PageEvent) {
    this.data=[]
    console.log(event)
    this.page = event.pageIndex + 1
    this.itemPerPage = event.pageSize
    
    this.tenderService.getTenders(this.page, this.itemPerPage).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tenders = response.data.tenders;
      console.log(response)
      this.totalRecords = response.data.items;
      console.log(this.totalRecords)
      this.tenders.map(tender => {
        let startDate = moment(new Date(tender.startDate)).format('DD-MM-YYYY').toString();
        let deadLine = moment(new Date(tender.deadLine)).format('DD-MM-YYYY').toString();
        tender.startDate = startDate;
        tender.deadLine = deadLine;
        this.data=this.tenders;

    })
  })
     

   
}








}
