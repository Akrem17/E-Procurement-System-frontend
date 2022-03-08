import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-supplier-signup-licence',
  templateUrl: './supplier-signup-licence.component.html',
  styleUrls: ['./supplier-signup-licence.component.css']
})
export class SupplierSignupLicenceComponent implements OnInit {
  myForm!: FormGroup;
  type:string="";
  @Input()
  basicInfo!: FormGroup;
  AddressPage:boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required ]],
      registrationNumber: ['', [Validators.required,Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      acquisitionDate: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      issuingInstitutionName: ['', [Validators.required]],

    });
    
  }

  
  onSubmit(form: FormGroup) {
    this.basicInfo.addControl('licence', new FormGroup(form.controls)); 
   //set the next component visibilty to true
   this.AddressPage=true
    //scroll to the top of page
   document.body.scrollTop = document.documentElement.scrollTop = 0;
        //check registartion number
    
  }

}
