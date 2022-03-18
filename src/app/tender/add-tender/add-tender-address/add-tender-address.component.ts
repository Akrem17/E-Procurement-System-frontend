import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-tender-address',
  templateUrl: './add-tender-address.component.html',
  styleUrls: ['./add-tender-address.component.css']
})
export class AddTenderAddressComponent implements OnInit {

  myForm!: FormGroup;
  type:string="";
  @Input()
  basicInfo!: FormGroup;
  next:boolean=false;
  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router,private tenderService:TenderService,private userService:UserService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      countryName: ['', [Validators.required]],
      postalCode: ['', [Validators.required ]],
      city: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: ['', [Validators.required]],   

    });
  
  }

  
  onSubmit(form: FormGroup) {

    this.basicInfo.addControl('address', new FormGroup(form.controls)); 

   //modeling address
   let adrress:ADDRESS = new ADDRESS();
   adrress.city =this.basicInfo.value.address.city; adrress.countryName = this.basicInfo.value.address.countryName; adrress.postalCode = this.basicInfo.value.address.postalCode; adrress.street1 = this.basicInfo.value.address.street1; adrress.street2 = this.basicInfo.value.address.street2;

  //modeling classification
    let tendersClass:TENDER_CLASSIFICATION[] =[];
    this.basicInfo.value.classification.classification.forEach(element => {
      let classification:TENDER_CLASSIFICATION = new TENDER_CLASSIFICATION();
      classification.amount=element.amount;classification.name=element.name;classification.description=element.description;classification.tenderId=element.tenderId
      tendersClass.push(classification)
    });
    

   //modeling representative

    let responsable:REPRESENTATIVE = new REPRESENTATIVE(); 
    responsable.email=this.basicInfo.value.responsable.email; responsable.name=this.basicInfo.value.responsable.name; responsable.phone=this.basicInfo.value.responsable.phone.toString(); responsable.position=this.basicInfo.value.responsable.position; responsable.socialSecurityNumber=this.basicInfo.value.responsable.socialSecurityNumber; responsable.socialSecurityNumberDate=this.basicInfo.value.responsable.socialSecurityNumberDate;
  
  //modeling tender
    let tender :TENDER = new TENDER();
    tender.addressReceipt=adrress;tender.responsible=responsable;tender.budget=this.basicInfo.value.budget;tender.tenderClassification=tendersClass;tender.businessKind=this.basicInfo.value.businessKind;tender.departement=this.basicInfo.value.departement;tender.evaluationMethod=this.basicInfo.value.evaluationMethod;tender.financing=this.basicInfo.value.evaluationMethod;tender.financing=this.basicInfo.value.financing;tender.name=this.basicInfo.value.name;tender.specificationURL=this.basicInfo.value.specificationURL;tender.startDate=this.basicInfo.value.startDate;tender.deadLine=this.basicInfo.value.deadLine;
  

    this.userService.FilterUserBy(this._auth.email.value).subscribe(res=>{
       let response: RESPONSE = { status: res.status, message: res.message, data: res.data };
       if(response.status){
        tender.instituteId=response.data[0].id;
        console.log(tender)

        this.tenderService.postTender(tender).subscribe(res=>{
          console.log(res)
          if (res)
          Swal.fire(
            'Tender added successfully !',
            '',
            'success'
          )
       })
       }
       
    }
      );


     this._router.navigate(['/consulting']);

  }


  
}
