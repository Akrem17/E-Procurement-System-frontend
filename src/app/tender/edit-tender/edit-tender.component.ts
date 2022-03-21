import { HeaderRowOutlet } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AddressService } from 'src/app/Shared/Services/AddressService/address.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-edit-tender',
  templateUrl: './edit-tender.component.html',
  styleUrls: ['./edit-tender.component.css']
})
export class EditTenderComponent implements OnInit {
  tender!:TENDER;
  editFormTenderInfo:boolean=false;
  TenderInfoForm!: FormGroup;

  editFormRepresentative:boolean=false;

  tenderClassification:TENDER_CLASSIFICATION[]=[];
  page_size=1;
  id!:string;


  constructor(private tenderService:TenderService,private fb: FormBuilder,private route: ActivatedRoute,private addressService:AddressService) { }

   paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  loadMoreClassification(){
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender.tenderClassification,3,this.page_size));

  }


  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get("id");


    this.tenderService.getTenderById(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.tender=response.data;
      this.tenderClassification=this.paginate(this.tender.tenderClassification,3,1);
      
      this.TenderInfoForm = this.fb.group({
        name: [this.tender.name, [Validators.required]],
        businessKind: [this.tender.businessKind, [Validators.required]],
        financing: [this.tender.financing, [Validators.required]],
        budget: [this.tender.budget, [Validators.required]],
        startDate: [this.tender.startDate, [Validators.required]],
        deadLine: [this.tender.deadLine, [Validators.required]],
        evaluationMethod: [this.tender.evaluationMethod, [Validators.required]],
        departement: [this.tender.departement, [Validators.required]],
        city: [this.tender.addressReceipt.city, [Validators.required]],
        postalCode: [this.tender.addressReceipt.postalCode, [Validators.required]],
        street1: [this.tender.addressReceipt.street1, [Validators.required]],
     


      });
      
 
    })

  }



  enableEditingTenderInfo(){

    this.editFormTenderInfo=true
  }
  saveTenderInfo(form){
    console.log(form.value)
    this.tender.name=form.value.name;this.tender.businessKind=form.value.businessKind;this.tender.financing=form.value.financing;this.tender.budget=form.value.budget;this.tender.evaluationMethod=form.value.evaluationMethod;this.tender.departement=form.value.departement;this.tender.startDate=form.value.startDate.toString();this.tender.deadLine=form.value.deadLine.toString();

    let address:ADDRESS= new ADDRESS();
    address.city=form.value.city;this.tender.addressReceipt.city=address.city;address.postalCode=form.value.postalCode;this.tender.addressReceipt.postalCode=address.postalCode;address.street1=form.value.street1;this.tender.addressReceipt.street1=address.street1

    address.countryName=""
    address.street2=""

    
    this.addressService.updateAddress(this.tender.addressReceiptId.toString(),address).subscribe(res=>{

      console.log(res)
    })
   
    let updatedTender;
     updatedTender= {...this.tender};
    updatedTender.addressReceipt=null;
    updatedTender.institute=null;
    updatedTender.responsible=null;
    

    

    this.tenderService.updateTender(this.id,updatedTender).subscribe(res=>{

      this.editFormTenderInfo=false

    })



  }

  }
