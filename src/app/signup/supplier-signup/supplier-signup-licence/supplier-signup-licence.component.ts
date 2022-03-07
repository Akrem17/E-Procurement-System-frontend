import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AuthService } from 'src/app/Shared/Services/auth.service';

@Component({
  selector: 'app-supplier-signup-licence',
  templateUrl: './supplier-signup-licence.component.html',
  styleUrls: ['./supplier-signup-licence.component.css']
})
export class SupplierSignupLicenceComponent implements OnInit {
  myForm!: FormGroup;
  formCitizen!: FormGroup;
  type:string="";
  @Input()
  basicInfo!: FormGroup;
  
  constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required ]],
      registrationNumber: ['', [Validators.required]],
      acquisitionDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      issuingInstitutionName: ['', [Validators.required]],
   

     

    });
    
  }

  
  onSubmit(form: FormGroup) {
    console.log(form.value);

  
    this.basicInfo.addControl('licence', new FormGroup(form.controls)); 

   console.log(this.basicInfo.value);
        //check registartion number
        //
 
  }


  registerUser( citizen:SUPPLIER){
    this._auth.registreUser(citizen).subscribe(res=>console.log(res))
  }
}
