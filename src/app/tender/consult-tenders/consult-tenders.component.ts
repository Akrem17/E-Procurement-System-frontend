import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-consult-tenders',
  templateUrl: './consult-tenders.component.html',
  styleUrls: ['./consult-tenders.component.css']
})
export class ConsultTendersComponent implements OnInit {
  data: TENDER[] = []
  tenders: TENDER[] = []
  itemPerPage: number = 9
  page: number = 1
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  totalRecords: number;
  //displayedColumns: string[] = ['code','test','taa','data'];

  constructor(private tenderService: TenderService, private instuteService: InstituteService) { }

  ngOnInit(): void {
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
        this.instuteService.getInstituteById(tender.instituteId.toString()).subscribe(res => {
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          tender["instituteName"] = response.data?.institutes?.nameFr;
          this.data = this.tenders;
          let test = [{ "code": "test" }];

          this.dataSource = new MatTableDataSource(test)


        })
      })



    })
  }



  
  onChangePage(event: PageEvent) {
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
        this.instuteService.getInstituteById(tender.instituteId.toString()).subscribe(res => {
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          tender["instituteName"] = response.data?.institutes?.nameFr;
          this.data = this.tenders;
          let test = [{ "code": "test" }];

          this.dataSource = new MatTableDataSource(test)


        })
      })
    })
}








}
