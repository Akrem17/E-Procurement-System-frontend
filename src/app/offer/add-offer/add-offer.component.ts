import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {


  basicInfo!: FormGroup;
  tenderInfo!: FormGroup;
  part2Form!: FormGroup;
  myForm!: FormGroup;
  type:string="";
  LicencePage:boolean=false;
  next:boolean=false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      financial: ['', [Validators.required]],
      technical: ['', [Validators.required]],
      other: ['', [Validators.required]],



    });
    
  }

  
  onSubmit(form: FormGroup) {
    
    console.log(form)
    this.basicInfo=form
      //set the next component visibilty to true
      this.next=true;
         //scroll to the top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }

}
