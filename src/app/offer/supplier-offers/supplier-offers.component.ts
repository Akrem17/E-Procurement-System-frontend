import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { OFFER_FILTERS } from 'src/app/Shared/Models/OFFER_FILTERS';
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
  filters!: FormGroup;
  offers: OFFER[] = [];
  constructor(private route: ActivatedRoute, private _offerService: OfferService, private fb: FormBuilder, private tenderService: TenderService, private instuteService: InstituteService) { }
  supplierId: string;




  callOffers(skip: number = 0, take: number = 10, supplierId: string = null, supplierEmail = null) {

    supplierId = this.route.snapshot.paramMap.get("id");

    let filters: OFFER_FILTERS = new OFFER_FILTERS();


    filters.supplierEmail = supplierEmail;
    filters.supplierId = supplierId;
    this._offerService.getOfferBy(skip, take, filters).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.totalRecords = response.data.itemsNumber

      response.data.offer.forEach(element => {
        console.log(element)
        element.tenderInfo.startDate=moment(new Date(element.tenderInfo.startDate)).format('DD-MM-YYYY').toString();
        element.tenderInfo.deadLine=moment(new Date(element.tenderInfo.deadLine)).format('DD-MM-YYYY').toString();
        this.offers.push(element)
   

      });

    })

  }
  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get("id");
    this.callOffers()


    this.filters = this.fb.group({
      offerNumber: ["", [Validators.required]],
      tenderName: ["", [Validators.required]],
      city: ["", [Validators.required]],
      postDate: ["", [Validators.required]],
      supplierEmail: ["", [Validators.required]],
      status: ["", [Validators.required]],

    });


    // this.filters.get("offerNumber").valueChanges.subscribe(selectedValue => {

    //   let filters: OFFER_FILTERS = new OFFER_FILTERS();
    //   filters.offerNumber = selectedValue;
    //   filters.supplierId = this.supplierId;

    //   if (!(this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.offerNumber))) {

    //     this.callOffersWithFilters(this.page, this.itemPerPage, filters)
    //   }
    //   else {
    //     //this.callAllTenders()
    //   }
    // })


    // this.filters.get("tenderName").valueChanges.subscribe(selectedValue => {
    //   let filters: OFFER_FILTERS = new OFFER_FILTERS();
    //   filters = this.filters.value;
    //   filters.tenderName = selectedValue;


    //   if (!(this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.offerNumber))) {

    //     this.callOffersWithFilters(this.page, this.itemPerPage, filters)
    //   }
    //   else {
    //     //this.callAllTenders()
    //   }
    // })
    // this.filters.get("city").valueChanges.subscribe(selectedValue => {
    //   let filters: OFFER_FILTERS;
    //   filters = this.filters.value;
    //   filters.city = selectedValue;

    //   console.log(filters)
    // })
    // this.filters.get("postDate").valueChanges.subscribe(selectedValue => {
    //   let filters: OFFER_FILTERS;
    //   filters = this.filters.value;
    //   filters.postDate = selectedValue;

    //   console.log(filters)
    // })


    
    this.filters.get("offerNumber").valueChanges.subscribe(selectedValue => {

      let filters: OFFER_FILTERS;
      filters = this.filters.value;
      filters.offerNumber = selectedValue;
      //filters.postDate = new Date(filters.postDate )?.toISOString()
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }
      if (!(this.isEmptyOrNull(filters?.offerNumber) && this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.city) &&this.isEmptyOrNull(filters?.postDate)  && this.isEmptyOrNull(filters?.supplierEmail))) {

        this.callOffersWithFilters(this.page, this.itemPerPage, filters)
      }
      else {
        this.callOffers()
      }
    })


    this.filters.get("tenderName").valueChanges.subscribe(selectedValue => {
      let filters: OFFER_FILTERS;
      filters = this.filters.value;
      filters.tenderName = selectedValue;
      //filters.postDate = new Date(filters.postDate )?.toISOString()
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }

      if (!(this.isEmptyOrNull(filters?.offerNumber)  && this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.city) &&this.isEmptyOrNull(filters?.postDate)  && this.isEmptyOrNull(filters?.supplierEmail))) {

        this.callOffersWithFilters(this.page, this.itemPerPage, filters)
      }
      else {
        this.callOffers()
      }
    })


    this.filters.get("supplierEmail").valueChanges.subscribe(selectedValue => {
      let filters: OFFER_FILTERS;
      filters = this.filters.value;
      filters.tenderName = selectedValue;
      //filters.postDate = new Date(filters.postDate )?.toISOString()
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }

      if (!(this.isEmptyOrNull(filters?.offerNumber)  && this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.city) &&this.isEmptyOrNull(filters?.postDate)  && this.isEmptyOrNull(filters?.supplierEmail))) {

        this.callOffersWithFilters(this.page, this.itemPerPage, filters)
      }
      else {
        this.callOffers()
      }
    })
    this.filters.get("city").valueChanges.subscribe(selectedValue => {
      let filters: OFFER_FILTERS;
      filters = this.filters.value;
      filters.city = selectedValue;
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }
      if (!(this.isEmptyOrNull(filters?.offerNumber)  && this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.city) &&this.isEmptyOrNull(filters?.postDate)  && this.isEmptyOrNull(filters?.supplierEmail))) {
        this.callOffersWithFilters(this.page, this.itemPerPage, filters)
      }
      else {
        this.callOffers()
      }

     })
     this.filters.get("postDate").valueChanges.subscribe(selectedValue => {
      let filters: OFFER_FILTERS;
      filters = this.filters.value;
      filters.postDate = selectedValue;
      if( filters.postDate!=""){
        
        filters.postDate = new Date(filters.postDate )?.toISOString()
      }else{
        filters.postDate=''
      }
      if (!(this.isEmptyOrNull(filters?.offerNumber)  && this.isEmptyOrNull(filters?.tenderName) && this.isEmptyOrNull(filters?.city) &&this.isEmptyOrNull(filters?.postDate)  && this.isEmptyOrNull(filters?.supplierEmail))) {
        this.callOffersWithFilters(this.page, this.itemPerPage, filters)
      }
      else {
        this.callOffers()
      }

     })
    
    // this.filters.get("postDate").valueChanges.subscribe(selectedValue => {
    //   let filters: TENDER_FILTERS;
    //   filters = this.filters.value;
    //   if(selectedValue!=""){
    //   filters.postDate = selectedValue;
      
    //   filters.postDate = new Date(filters.postDate )?.toISOString()
    // }else{
    //   filters.postDate=''
    // }
    //   if (!(this.isEmptyOrNull(filters?.bidName) && this.isEmptyOrNull(filters?.bidNumber)  && this.isEmptyOrNull(filters?.city) && this.isEmptyOrNull(filters?.postDate))) {
    //     this.callTendersWithFilters(filters)
    //   }
    //   else {
    //     this.callAllTenders(id)
    //   }
    // })
  
  

  }

  clearDate(){
    this.filters.get("postDate").setValue('');
    console.log(this.filters.value)
  }

  callOffersWithFilters(skip: number = 0, take: number = 10, filters: OFFER_FILTERS) {

    this._offerService.getOfferBy(skip, take, filters).subscribe(res => {
      this.offers = []

      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response)
      this.totalRecords = response.data.itemsNumber

      response.data.offer.forEach(element => {
        this.offers.push(element)
        console.table(this.offers)

      });


    })
  }

  applyFilters(form) {
    console.log(form.value)
  }




  onChangePage(event: PageEvent) {
    let supplierId: string = this.route.snapshot.paramMap.get("id");
    let supplierEmail = null
    this.data = []

    this.itemPerPage = event.pageSize
    this.page = event.pageIndex * event.pageSize


    let filters: OFFER_FILTERS = new OFFER_FILTERS();
    filters.supplierEmail = supplierEmail;
    filters.supplierId = supplierId;
    this._offerService.getOfferBy(this.page, this.itemPerPage, filters).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.offers = response.data.offer

      console.log(response)

      console.log(this.totalRecords)
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
  isEmpty(filter: OFFER_FILTERS): boolean {

    if (filter == null) return true
    return false;
  }

  deleteOffer(id) {
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

        this._offerService.deleteOffer(id).subscribe(res => {
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          if (response.status) {
            var removeIndex = this.offers.map(item => item.id).indexOf(id);
            this.offers.splice(removeIndex, 1);
            Swal.fire(
              'Deleted successfully!',
              '',
              'success'
            )
          } else {

            Swal.fire(
              'Error: ' + response.message,
              '',
              'error'
            )

          }

        })
      }
    });

  }


}
