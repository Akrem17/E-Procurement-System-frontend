import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-consult-single-tender',
  templateUrl: './consult-single-tender.component.html',
  styleUrls: ['./consult-single-tender.component.css']
})
export class ConsultSingleTenderComponent implements OnInit {

  tender!: TENDER;
  editForm: boolean = false;
  tenderClassification: TENDER_CLASSIFICATION[] = [];
  page_size = 1;
  tenderSpecifications: any[] = [];
  id: string;
  offers:OFFER[];
  itemPerPage: number = 5
  page: number = 1
  totalRecords: number;
  data:OFFER[];
  winner:OFFER;
  pageNo: number;
  userType:string;
  constructor(private authService :AuthService, private tenderService: TenderService, private route: ActivatedRoute, private specificationService: SpecificationService) { }



  paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  loadMoreClassification() {
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender.tenderClassification, 3, this.page_size));

  }

  extractResult(){
    this.tenderService.extractResult(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response)
      if (!response.status){
        Swal.fire(
          'Cannot be extracted',
          response.message,
          'error'
        )
      }
    })
  }

  ngOnInit(): void {
    this.pageNo = 0;
    this.authService.type.subscribe(res=>{
      this.userType=res;
      console.log(this.userType)
    })
    this.id = this.route.snapshot.paramMap.get("id");


    this.tenderService.getTenderById(this.id).subscribe(res => {
      console.log(res)

      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tender = response.data.tender;

      this.tender.offers= response.data.offers;
      console.log(this.tender)
      this.tender.startDate=moment(this.tender.startDate).utc().format('MM/DD/YYYY')
      this.tender.deadLine=moment(this.tender.deadLine).utc().format('MM/DD/YYYY')
      this.tender.addressReceipt.countryName="Tunisia"
      this.tender.responsible.socialSecurityNumberDate=moment(  this.tender.responsible.socialSecurityNumberDate).utc().format('MM/DD/YYYY')
     this.tenderClassification = this.paginate(this.tender.tenderClassification, 3, 1);
      this.offers=[... this.tender.offers]
      this.totalRecords=this.tender.offers.length
      console.log(this.offers)

      this.data=this.paginate( this.offers,this.itemPerPage,this.page)

    })

    this.tenderService.extractResult(this.id).subscribe((res)=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if(response.status){
        this.winner=response.data;
      }
    })
  }


  onChangePage(event: PageEvent) {
    this.data = []

    this.itemPerPage = event.pageSize
    event.pageIndex > event.previousPageIndex? this.page ++:this.page --
    this.data=this.paginate( this.offers,this.itemPerPage,this.page)

  }

  niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     let l = 0, n = parseInt(x, 10) || 0;
     while(n >= 1024 && ++l){
         n = n/1024;
     }
     return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
   }
   
  enableEdit() {this.editForm = true}

  downloadPDF(id) {

    this.specificationService.downloadSpecification(id).subscribe(file => {
      this.specificationService.getSpecifications(id).subscribe(res => {
        saveAs(file, res.data.fileName);
      })

    })


  }
}
