import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-supplier-signup-representative',
  templateUrl: './supplier-signup-representative.component.html',
  styleUrls: ['./supplier-signup-representative.component.css']
})
export class SupplierSignupRepresentativeComponent implements OnInit {
  @Input()
  basicInfo!: FormGroup;
  
  part2Form!: FormGroup;
  myForm!: FormGroup;
  formCitizen!: FormGroup;
  type:string="";
  LicencePage:boolean=false;
  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router) { }

  ngOnInit(): void {

    console.log(this.basicInfo)
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      socialSecurityNumber: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      position: ['', [Validators.required]],
      socialSecurityNumberDate: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.min(20000000), Validators.max(99999999)]],
      email: ['', [Validators.required,Validators.email]],
      

     

    });
    
  }

  
  onSubmit(form: FormGroup) {
  
    this.basicInfo.addControl('representative', new FormGroup(form.controls)); 

   console.log(this.basicInfo.value);
    this.LicencePage=true;
    document.body.scrollTop = document.documentElement.scrollTop = 0;

   //check social securty number

 //check social securty number
   //check registration number
   
  }



}
