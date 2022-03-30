import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OFFER } from 'src/app/Shared/Models/OFFER';
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
  tenderClassification: TENDER_CLASSIFICATION[] = [];
  page_size = 1;
  tenderSpecifications: any[] = [];
  id: string;
  offer!:OFFER;
  financial!:SPECIFICATION;
  constructor(private offerService:OfferService, private http: HttpClient, private tenderService: TenderService, private route: ActivatedRoute, private specificationService: SpecificationService) { }



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
    this.offerService.getSingleOffer(this.id).subscribe(res=>{
      console.log(res)
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.offer=response.data;
      //@ts-ignore
      this.financial=this.offer.files[0];
      console.log(this.financial)

      

    })
    this.id = "250";

    this.tenderService.getTenderById(this.id).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tender = response.data;
      this.tenderClassification = this.paginate(this.tender?.tenderClassification, 3, 1);
      
      console.log(this.tender);
    })


  }



  enableEdit() {this.editForm = true}

  downloadPDF(id) {

    // this.specificationService.downloadSpecification(id).subscribe(file => {
    //   this.specificationService.getSpecifications(id).subscribe(res => {
    //     console.log(res)
    //     saveAs(file, res.data.fileName);
    //   })

    // })


  }
}