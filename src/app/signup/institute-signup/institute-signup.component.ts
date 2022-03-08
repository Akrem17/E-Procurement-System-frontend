import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
 type:string="";
 next:boolean=false;

 constructor(private fb: FormBuilder) { }

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
