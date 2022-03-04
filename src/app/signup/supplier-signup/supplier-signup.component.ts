import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CITIZEN } from 'src/app/Shared/Models/CITIZEN';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { GlobalConstants } from 'src/app/Shared/user-type';

@Component({
  selector: 'app-supplier-signup',
  templateUrl: './supplier-signup.component.html',
  styleUrls: ['./supplier-signup.component.css']
})
export class SupplierSignupComponent implements OnInit {
  // @Input()
  // x!: FormGroup;
 
  myForm!: FormGroup;
  formCitizen!: FormGroup;
  type:string="";

  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      category: ['', [Validators.required ]],
      registrationNumber: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      cnssId: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      buisnessClassification: ['', [Validators.required]],
      replyEmail: ['', [Validators.required]],
      buisnessType: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fax: ['', [Validators.required]]
   
      // postalCode: ['', [Validators.required]],
      // country: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      // city: ['', [Validators.required]],

     

    });
    
  }

  
  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false
    // console.log('password', form.value);
    // var supplier: SUPPLIER = new SUPPLIER();
    // supplier.address=form.value.address
    // supplier.buisnessClassification=form.value.buisnessClassification
    // supplier.buisnessType=form.value.buisnessType
    // supplier.category=form.value.category
    // supplier.cnssId=form.value.cnssId
    // supplier.companyName=form.value.companyName
    // supplier.email=form.value.email
    // supplier.fax=form.value.fax
    // supplier.firstName=form.value.firstName
    // supplier.lastName=form.value.lastName
    // supplier.licence=form.value.licence
    // supplier.password=form.value.password
    // supplier.phone=form.value.phone
    // supplier.registrationDate=form.value.registrationDate
    // supplier.registrationNumber=form.value.registrationNumber
    // supplier.replyEmail=form.value.replyEmail
    // supplier.representative=form.value.representative
    // supplier.supplierName=form.value.supplierName
    // supplier.taxId=form.value.taxId
    // supplier.type=form.value.type
   // console.log(supplier)
    

    // console.log('Email', form.value.email);
    // console.log('Email', form.value.type);
    // this.type=form.value.type;
  //   console.log(  GlobalConstants.usertype) 
  //  // this.formCitizen=new FormGroup({userInfo:form,citizenInfo:this.x})
  //  // console.log(this.formCitizen.value
  //   console.log(this.x.get("email")?.value)
     
     

        
        
     
  //      var citizen:CITIZEN = new CITIZEN();
  //       citizen.email=this.x.get("email")?.value;
  //       citizen.password=this.x.get("password")?.value;
  //       citizen.type=this.x.get("type")?.value;
  //       citizen.firstName=form.value.firstname;
  //       citizen.lastName=form.value.lastname;
  //       citizen.phone=form.value.phone.toString();
  //       citizen.cin=form.value.cin.toString();
  //       console.log(citizen);

        
        
  //   this.registerUser(citizen);
  //   this._router.navigate(['/login'],{'state':{'verify':'true'}});
  }


  registerUser( citizen:CITIZEN){
    this._auth.registreUser(citizen).subscribe(res=>console.log(res))
  }
}
