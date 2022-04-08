import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { INSTITUTE } from 'src/app/Shared/Models/INSTITUTE';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SPECIFICATION } from 'src/app/Shared/Models/SPECIFICATION';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { SupplierService } from 'src/app/Shared/Services/SupplierService/supplier.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-consult-institute',
  templateUrl: './consult-institute.component.html',
  styleUrls: ['./consult-institute.component.css']
})
export class ConsultInstituteComponent implements OnInit {

 

  tender!: TENDER;
  editForm: boolean = false;
  tenderClassification: TENDER_CLASSIFICATION[] = [];
  page_size = 1;
  tenderSpecifications: any[] = [];
  id: string;
  offer!:OFFER;
  financial!:SPECIFICATION;
  institute!:INSTITUTE;
  constructor(private _instituteService:InstituteService, private offerService:OfferService, private http: HttpClient, private tenderService: TenderService, private route: ActivatedRoute, private specificationService: SpecificationService) { }



  paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array?.slice((page_number - 1) * page_size, page_number * page_size);
  }


  loadMoreClassification() {
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender?.tenderClassification, 3, this.page_size));

  }


  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    this._instituteService.getInstituteById(this.id).subscribe(res=>{
      console.log(res)

      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      if(response.status){
        this.institute=response.data;
        console.log(this.institute)


      }
 


    })
    this.offerService.getSingleOffer(this.id).subscribe(res=>{
      console.log(res)
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.offer=response.data;
      //@ts-ignore
      //this.financial=this.offer.files[0];
      console.log(this.financial)

      

    })


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
