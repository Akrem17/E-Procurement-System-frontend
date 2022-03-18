import { Component, OnInit } from '@angular/core';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-consult-single-tender',
  templateUrl: './consult-single-tender.component.html',
  styleUrls: ['./consult-single-tender.component.css']
})
export class ConsultSingleTenderComponent implements OnInit {

  constructor(private tenderService:TenderService) { }
  tender!:TENDER;
  tenderClassification:TENDER_CLASSIFICATION[]=[];
  page_size=1;

   paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  loadMoreClassification(){
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender.tenderClassification,3,this.page_size));

  }


  ngOnInit(): void {
    this.tenderService.getTenderById("305").subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.tender=response.data;
      this.tenderClassification=this.paginate(this.tender.tenderClassification,3,1);
      console.log( this.tenderClassification);
    })


  }

}
