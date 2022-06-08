import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { OFFER_CLASSIFICATION } from 'src/app/Shared/Models/OFFER_CLASSIFICATIONS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SPECIFICATION } from 'src/app/Shared/Models/SPECIFICATION';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-consult-offer',
  templateUrl: './consult-offer.component.html',
  styleUrls: ['./consult-offer.component.css']
})
export class ConsultOfferComponent implements OnInit {

  
  tender!: TENDER;
  editForm: boolean = false;
  offerClassification: OFFER_CLASSIFICATION[] = [];
  page_size = 1;
  id: string;
  offer!:OFFER;
  financial!:SPECIFICATION;
  other!:SPECIFICATION;

  consume="read";
  readTotalPrice
  constructor(private offerService:OfferService, private http: HttpClient, private tenderService: TenderService, private route: ActivatedRoute, private specificationService: SpecificationService) { }



  // paginate(array, page_size, page_number) {
  //   // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  //   return array?.slice((page_number - 1) * page_size, page_number * page_size);
  // }


  // loadMoreClassification() {
  //   this.page_size++;
  //   this.offerClassification.push(...this.paginate(this.tender?.tenderClassification, 3, this.page_size));

  // }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.offerService.getSingleOffer(this.id).subscribe(res=>{
      console.log(res)
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.offer=response.data;
      //@ts-ignore
      this.financial=this.offer.files[0];
      this.other=this.offer.files[1];
      console.log(this.financial)

      this.offerClassification=response.data.offerClassification;

    })
    //this.offerClassification = this.paginate(this.tender?.tenderClassification, 3, 1);

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
        console.log(res)
        saveAs(file, res.data.fileName);
      })

    })


  }
}
