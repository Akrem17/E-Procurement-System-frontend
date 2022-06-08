import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { INSTITUTE } from 'src/app/Shared/Models/INSTITUTE';
import { LICENCE } from 'src/app/Shared/Models/LICENCE';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AddressService } from 'src/app/Shared/Services/AddressService/address.service';
import { InstituteService } from 'src/app/Shared/Services/InstituteService/institute.service';
import { LicenceService } from 'src/app/Shared/Services/LicenceService/licence.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { RepresentativeService } from 'src/app/Shared/Services/RepresentativeService/representative.service';
import { SupplierService } from 'src/app/Shared/Services/SupplierService/supplier.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-institute',
  templateUrl: './edit-institute.component.html',
  styleUrls: ['./edit-institute.component.css']
})
export class EditInstituteComponent implements OnInit {

 


  myForm!: FormGroup;

  addressForm!: FormGroup;
  licenceForm!: FormGroup;
  representativeForm!: FormGroup;

  type:string="";
  LicencePage:boolean=false;
  next:boolean=false;
  institute!:INSTITUTE;
  myFiles:string [] = [];
  id!:string;
  constructor(private _representativeService : RepresentativeService, private _licenceService:LicenceService, private _addressServer:AddressService, private _instituteService:InstituteService, private route: ActivatedRoute,private fb: FormBuilder,private offerService:OfferService,private userService:UserService,private _router:Router) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)

    this._instituteService.getInstituteById(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
   
      if(response.status)
      
         this.institute=response.data;
         this.institute.interlocutor.socialSecurityNumberDate = moment(new Date(   this.institute.interlocutor.socialSecurityNumberDate)).format('DD-MM-YYYY').toString();
         this.myForm = this.fb.group({
          nameFr: [this.institute.nameFr, [Validators.required]],
          nameAr: [this.institute.nameAr, [Validators.required]],
          typeOfInstitute: [this.institute.typeOfInstitute, [Validators.required]],
          areaType: [this.institute.areaType, [Validators.required]],
          representativeName: [this.institute.representativeName ,[Validators.required]],
          notificationEmail: [this.institute.notificationEmail, [Validators.required]],
          phone: [this.institute.phone, [Validators.required]],
          fax: [this.institute.fax, [Validators.required]]
        });

        this.addressForm = this.fb.group({

          postalCode: [this.institute.address.postalCode, [Validators.required]],
          city: [this.institute.address.city, [Validators.required]],
          street1: [this.institute.address.street1, [Validators.required]],
        
        });

        this.representativeForm = this.fb.group({
          name: [this.institute.interlocutor.name, [Validators.required]],
          position: [this.institute.interlocutor.position, [Validators.required]],
          email: [this.institute.interlocutor.email, [Validators.required]],
          phone: [this.institute.interlocutor.phone, [Validators.required]],
          socialSecurityNumber: [this.institute.interlocutor.socialSecurityNumber, [Validators.required]],
          socialSecurityNumberDate: [this.institute.interlocutor.socialSecurityNumberDate,[Validators.required]],
        
        });
    //   }
    // });
  });
}


 updateInsitute(form){
   console.log(form.value)
  let s:INSTITUTE;
  
  s=form.value;s.addressId=this.institute.addressId;s.interlocutorId=this.institute.interlocutorId;s.password=this.institute.password;s.email=this.institute.email;s.type=this.institute.type;
  console.log(s)

   this._instituteService.updateInstitute(this.id,s) .subscribe(res=>{
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


 updateAddress(form){
  let s:ADDRESS;
 s=form.value;s.countryName="Tunisia";s.street2="ds";s.id=this.institute.address.id;

  this._addressServer.updateAddress(this.institute.address.id.toString(),s).subscribe(res=>{
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

  let s:REPRESENTATIVE;
  s=form.value;
  this._representativeService.updateRepresentative(this.institute.interlocutorId.toString(),s).subscribe(res=>{

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

  })
  
 }


}
