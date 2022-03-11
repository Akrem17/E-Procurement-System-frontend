import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.css']
})
export class AddTenderComponent implements OnInit {

  @Input()
  basicInfo!: FormGroup;
  
  part2Form!: FormGroup;
  myForm!: FormGroup;
  type:string="";
  LicencePage:boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    console.log(this.basicInfo)
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      businessKind: ['', [Validators.required]],
      financing: ['', [Validators.required]],
      budget: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      evaluationMethod: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      specificationURL: ['', [Validators.required]],
      countryName: ['', [Validators.required]],
      postalCode: ['', [Validators.required ]],
      city: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      street2: ['', [Validators.required]],   
      responsible: ['', [Validators.required]],   


    });
    
  }

  
  onSubmit(form: FormGroup) {
    
    console.log(form.value)





  }
}
