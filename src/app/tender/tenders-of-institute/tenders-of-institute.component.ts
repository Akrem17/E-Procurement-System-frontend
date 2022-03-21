import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
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

  constructor(private tenderService: TenderService, private instuteService: InstituteService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let  id = this.route.snapshot.paramMap.get("id");
    console.log(id)
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
