import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/Shared/Services/ValidatorService/validator.service';

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
  type:string="";
  next:boolean=false;

  constructor(private fb: FormBuilder, private _validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      supplierName: ['', [Validators.required]],
      category: ['', [Validators.required ]],
      registrationNumber: ['', [Validators.required,this._validatorService.ValidateLength]],
      registrationDate: ['', [Validators.required]],
      taxId: ['', [Validators.required,Validators.maxLength(7),Validators.minLength(7)]],
      cnssId: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.required]],
      companyName: ['', [Validators.required]],
      buisnessClassification: ['', [Validators.required]],
      replyEmail: ['', [Validators.required, Validators.email]],
      buisnessType: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.min(20000000), Validators.max(99999999)]],
      fax: ['', [Validators.required, Validators.min(30000000), Validators.max(99999999)]]

    });
    
  }

  onSubmit(form: FormGroup) {
 
    this.basicInfo=form;
    this.basicInfo.addControl('user', new FormGroup(this.user.controls)); 
    //set the next component visibilty to true
    this.next=true;
      //scroll to the top of page
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    //check buisness registration number
    //check taxid
    //check cnssid

  }
 
}
