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

   basicInfo!: FormGroup;
   @Input()
  user!: FormGroup;
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
   
    

     

    });
    
  }

  
  onSubmit(form: FormGroup) {
    console.log(form.value);
    this.basicInfo=form;
    console.log(this.user)
    this.basicInfo.addControl('user', new FormGroup(this.user.controls)); 

    //check buisness registration number
    //check taxid
    //check cnssid

    

  }


 
}
