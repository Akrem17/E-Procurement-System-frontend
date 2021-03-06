import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { INSTITUTE } from 'src/app/Shared/Models/INSTITUTE';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-institute-signup-address',
  templateUrl: './institute-signup-address.component.html',
  styleUrls: ['./institute-signup-address.component.css']
})
export class InstituteSignupAddressComponent implements OnInit {

  myForm!: FormGroup;
  type:string="";
  @Input()
  basicInfo!: FormGroup;
  next:boolean=false;
  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // countryName: ['', [Validators.required]],
      postalCode: ['', [Validators.required ]],
      city: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      // street2: ['', [Validators.required]],
  
    });
    
  }

  
  onSubmit(form: FormGroup) {

     this.basicInfo.addControl('address', new FormGroup(form.controls)); 

  //  //modeling address
   let adrress:ADDRESS = new ADDRESS();
   adrress.city =this.basicInfo.value.address.city;  adrress.postalCode = this.basicInfo.value.address.postalCode; adrress.street1 = this.basicInfo.value.address.street1; 

  //  //modeling representative

   let interlocutor:REPRESENTATIVE = new REPRESENTATIVE(); 
   interlocutor.email=this.basicInfo.value.interlocutor.email; interlocutor.name=this.basicInfo.value.interlocutor.name; interlocutor.phone=this.basicInfo.value.interlocutor.phone.toString(); interlocutor.position=this.basicInfo.value.interlocutor.position; interlocutor.socialSecurityNumber=this.basicInfo.value.interlocutor.socialSecurityNumber; interlocutor.socialSecurityNumberDate=this.basicInfo.value.interlocutor.socialSecurityNumberDate;
  
   
  //modeling institute
    let institute :INSTITUTE = new INSTITUTE();
    institute.address=adrress;institute.areaType=this.basicInfo.value.areaType;institute.email=this.basicInfo.value.user.email;institute.fax=this.basicInfo.value.fax.toString();institute.interlocutor=interlocutor;institute.nameAr=this.basicInfo.value.nameAr;institute.notificationEmail=this.basicInfo.value.notificationEmail;institute.nameFr=this.basicInfo.value.nameFr;institute.password=this.basicInfo.value.user.password;institute.phone=this.basicInfo.value.phone.toString();institute.representativeName=this.basicInfo.value.representativeName;institute.type=this.basicInfo.value.user.type;institute.typeOfInstitute=this.basicInfo.value.typeOfInstitute;
    this._auth.registerInstitute(institute).subscribe(res=>{
      
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      if(response){
        Swal.fire(
          'Welcome to egovnez!',
          'signed up with success! please check your email',
          'success'
        ).then(()=>{
          this._router.navigate(['/login'],{'state':{'verify':'true'}});

        })
      }
    })

  }




}
