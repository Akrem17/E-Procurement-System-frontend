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

  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router) { }

  ngOnInit(): void {

    console.log(this.basicInfo)
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      socialSecurityNumber: ['', [Validators.required ]],
      position: ['', [Validators.required]],
      socialSecurityNumberDate: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      

     

    });
    
  }

  
  onSubmit(form: FormGroup) {
  
    this.basicInfo.addControl('representative', new FormGroup(form.controls)); 

   console.log(this.basicInfo.value);
   //check social securty number

 //check social securty number
   //check registration number
   
  }



}
