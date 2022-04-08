import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { LICENCE } from 'src/app/Shared/Models/LICENCE';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AddressService } from 'src/app/Shared/Services/AddressService/address.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { LicenceService } from 'src/app/Shared/Services/LicenceService/licence.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { RepresentativeService } from 'src/app/Shared/Services/RepresentativeService/representative.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { SupplierService } from 'src/app/Shared/Services/SupplierService/supplier.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {



  myForm!: FormGroup;

  addressForm!: FormGroup;
  licenceForm!: FormGroup;
  representativeForm!: FormGroup;

  type:string="";
  LicencePage:boolean=false;
  next:boolean=false;
  supplier!:SUPPLIER;
  myFiles:string [] = [];
  id!:string;
  constructor(private _representativeService : RepresentativeService, private _licenceService:LicenceService, private _addressServer:AddressService, private _supplierService:SupplierService, private route: ActivatedRoute,private fb: FormBuilder,private offerService:OfferService,private userService:UserService,private _router:Router) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    this._supplierService.getSupplierById(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response.data)

      if(response.status){
        this.supplier=response.data;

        this.myForm = this.fb.group({
          supplierName: [this.supplier.supplierName, [Validators.required]],
          category: [this.supplier.category, [Validators.required]],
          registrationNumber: [this.supplier.registrationNumber, [Validators.required]],
          registrationDate: [this.supplier.registrationDate, [Validators.required]],
          taxId: [this.supplier.taxId ,[Validators.required]],
          cnssId: [this.supplier.cnssId, [Validators.required]],
          buisnessClassification: [this.supplier.buisnessClassification, [Validators.required]],
          buisnessType: [this.supplier.buisnessType, [Validators.required]],
          replyEmail: [this.supplier.replyEmail, [Validators.required]],
          companyName: [this.supplier.companyName, [Validators.required]],
          phone: [this.supplier.phone, [Validators.required]],
          fax: [this.supplier.fax, [Validators.required]]
        });

        this.addressForm = this.fb.group({

          postalCode: [this.supplier.address.postalCode, [Validators.required]],
          city: [this.supplier.address.city, [Validators.required]],
          street1: [this.supplier.address.street1, [Validators.required]],
        
        });

        this.licenceForm = this.fb.group({
          name: [this.supplier.licence.name, [Validators.required]],
          registrationNumber: [this.supplier.licence.name, [Validators.required]],
          issuingInstitutionName: [this.supplier.licence.issuingInstitutionName, [Validators.required]],
          expirationDate: [this.supplier.licence.expirationDate, [Validators.required]],
          acquisitionDate: [this.supplier.licence.acquisitionDate, [Validators.required]],
          category: [this.supplier.licence.category, [Validators.required]],
        });

        this.representativeForm = this.fb.group({
          name: [this.supplier.representative.name, [Validators.required]],
          position: [this.supplier.representative.position, [Validators.required]],
          email: [this.supplier.representative.email, [Validators.required]],
          phone: [this.supplier.representative.phone, [Validators.required]],
          socialSecurityNumber: [this.supplier.representative.socialSecurityNumber, [Validators.required]],
          socialSecurityNumberDate: [this.supplier.representative.socialSecurityNumberDate,[Validators.required]],
        
        });
      }
    });
}


updateSupplier(form){
 let s:SUPPLIER;
 s=form.value;s.licenceId=this.supplier.licenceId;s.addressId=this.supplier.addressId;s.representativeId=this.supplier.representativeId;s.password=this.supplier.password;s.email=this.supplier.email;s.type=this.supplier.type;
this._supplierService.updateSupplier(this.id,s).subscribe(res=>{
  const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
  if(response.status){
    Swal.fire(
      'Updated with success !',
      '',
      'success'
    )
  
  }else{
    Swal.fire(
      'Error while updating !',
      '',
      'error'
    )
  
  }
  console.log(res) 

})


}

updateLicence(form){
  
  let s:LICENCE;
  s=form.value;
 
   this._licenceService.updateLicence (this.supplier.licenceId.toString(),s).subscribe(res=>{
     const response: RESPONSE = { status: res.status, message: res.message, data: res.data }
     
     if(response.status){
       Swal.fire(
         'Updated with success !',
         '',
         'success'
       )
     
     }else{
       Swal.fire(
         'Error while updating !',
         '',
         'error'
       )
     
     }
     console.log(res) 
 
   })
}

updateAddress(form){
  let s:ADDRESS;
 s=form.value;s.countryName="Tunisia";s.street2="ds";s.id=this.supplier.address.id;

  this._addressServer.updateAddress(this.supplier.address.id.toString(),s).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data }
    
    if(response.status){
      Swal.fire(
        'Updated with success !',
        '',
        'success'
      )
    
    }else{
      Swal.fire(
        'Error while updating !',
        '',
        'error'
      )
    
    }
    console.log(res) 

  })
}

updateRepresentative(form){
  console.log("hi")

  let s:REPRESENTATIVE;
  s=form.value;
  this._representativeService.updateRepresentative(this.supplier.representativeId.toString(),s).subscribe(res=>{
    console.log(res)

    const response: RESPONSE = { status: res.status, message: res.message, data: res.data }
    console.log(res)
    if(response.status){
      Swal.fire(
        'Updated with success !',
        '',
        'success'
      )
    
    }else{
      Swal.fire(
        'Error while updating !',
        '',
        'error'
      )
    
    }
    console.log(res) 

  })
  
}




}
