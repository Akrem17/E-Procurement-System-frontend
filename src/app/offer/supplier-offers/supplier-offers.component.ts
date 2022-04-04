import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_FILTERS } from 'src/app/Shared/Models/TENDER_FILTERS';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-offers',
  templateUrl: './supplier-offers.component.html',
  styleUrls: ['./supplier-offers.component.css']
})
export class SupplierOffersComponent implements OnInit {
  data: TENDER[] = []
  tenders: TENDER[] = []
  itemPerPage: number = 5
  page: number = 0
  totalRecords: number;
  filters!:FormGroup;
  offers:OFFER[]=[];
  constructor(private route: ActivatedRoute,private _offerService:OfferService, private fb:FormBuilder, private tenderService: TenderService, private instuteService: InstituteService) { }





    callOffers(skip:number=0,take:number=10,supplierId:string=null,supplierEmail=null){
       supplierId = this.route.snapshot.paramMap.get("id");

      this._offerService.getOfferBy(skip,take,supplierId,supplierEmail).subscribe(res=>{
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        response.data.forEach(element => {
          console.log(element)
          this.offers.push(element)
          console.table(this.offers)
          
        });

      })
      
    }
  ngOnInit(): void {

    this.callOffers()


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

      if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber))) {

        this.callTendersWithFilters(filters)
      }
      else {
        //this.callAllTenders()
      }
    })

  
  this.filters.get("bidName").valueChanges.subscribe(selectedValue => {
    let filters:TENDER_FILTERS;
    filters=this.filters.value;
    filters.bidName=selectedValue;


    if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber))) {

      this.callTendersWithFilters(filters)
    }
    else {
      //this.callAllTenders()
    }
  })
  this.filters.get("city").valueChanges.subscribe(selectedValue => {
    let filters:TENDER_FILTERS;
    filters=this.filters.value;
    filters.city=selectedValue;

    console.log(filters)
  })
  this.filters.get("postDate").valueChanges.subscribe(selectedValue => {
    let filters:TENDER_FILTERS;
    filters=this.filters.value;
    filters.postDate=selectedValue;

    console.log(filters)
  })

}



callTendersWithFilters(filters:TENDER_FILTERS){
  
  this.tenderService.FilterTenderBy(filters).subscribe(res=>{
    this.data=[]
    //@ts-ignore
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

  applyFilters(form){
    console.log(form.value)
  }



  
  onChangePage(event: PageEvent) {
    this.data=[]
    console.log(event)
    this.page = event.pageIndex + 1
    this.itemPerPage = event.pageSize
    
    this._offerService.getOfferBy(this.page, this.itemPerPage).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.offers = response.data;
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

isEmptyOrNull(str:string| null):boolean{
  if(str=="" || str==null)return true;
  return false;
  

}
isEmpty(filter:TENDER_FILTERS):boolean{
  
  if (filter==null) return true
  return false;
}

deleteOffer(id){
  console.log(id)
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
  
      this._offerService.deleteOffer(id).subscribe(res=>{
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        if(response.status){
          var removeIndex = this.offers.map(item => item.id).indexOf(id);
          this.offers.splice(removeIndex, 1);
          Swal.fire(
            'Deleted successfully!',
            '',
            'success'
          )
        }else{
       
            Swal.fire(
              'Error: '+response.message,
              '',
              'error'
            )

        }
    
      })
    }
       });

}


}
