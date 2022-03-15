import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.css']
})
export class AddTenderComponent implements OnInit {


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
      businessKind: ['', [Validators.required]],
      financing: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      deadLine: ['', [Validators.required]],
      evaluationMethod: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      specificationURL: ['', [Validators.required]]

    });
    
  }

  
  onSubmit(form: FormGroup) {
    
    this.basicInfo=form
      //set the next component visibilty to true
      this.next=true;
         //scroll to the top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;

  }
}
