import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { ValidatorService } from 'src/app/Shared/Services/ValidatorService/validator.service';

@Component({
  selector: 'app-institute-signup',
  templateUrl: './institute-signup.component.html',
  styleUrls: ['./institute-signup.component.css']
})
export class InstituteSignupComponent implements OnInit {


  basicInfo!: FormGroup;
  @Input()
 user!: FormGroup;
 myForm!: FormGroup;
 formCitizen!: FormGroup;
 type:string="";
 next:boolean=false;

 constructor(private fb: FormBuilder, private _auth :AuthService,private _router:Router, private _validatorService: ValidatorService) { 

  
 }

 ngOnInit(): void {
   this.myForm = this.fb.group({
     nameFr: ['', [Validators.required]],
     nameAr: ['', [Validators.required ]],
     typeOfInstitute: ['', [Validators.required]],
     areaType: ['', [Validators.required]],
     representativeName: ['', [Validators.required]],
     notificationEmail: ['', [Validators.required,Validators.email]],
     phone: ['', [Validators.required,Validators.min(20000000), Validators.max(99999999)]],
     fax: ['', [Validators.required, Validators.min(30000000), Validators.max(99999999)]]

   });
   
 }
 // get errorMessage(): string {
 //   const form: FormControl = (this.myForm.get('registrationNumber') as FormControl);
 //   return form.hasError('required') ?
 //     'registrationNumber is required' :
 //     form.hasError('ValidateLength') ?
 //       'registration Number length should be more than 8 caracters' :
 //       form.hasError('ValidatePassword') ?
 //         'Passowrdr' : '';
 // }
 
 onSubmit(form: FormGroup) {
   console.log(form.value);
   this.basicInfo=form;
   console.log(this.user)
   this.basicInfo.addControl('user', new FormGroup(this.user.controls)); 
   this.next=true;
   document.body.scrollTop = document.documentElement.scrollTop = 0;
   console.log(this.next)
   console.log(this.basicInfo.value)

   //check buisness registration number
   //check taxid
   //check cnssid

   

 }  
}
