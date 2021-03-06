import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  type: string = "";
  LicencePage: boolean = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    console.log(this.basicInfo)
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      socialSecurityNumber: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      position: ['', [Validators.required]],
      socialSecurityNumberDate: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.min(20000000), Validators.max(99999999)]],
      email: ['', [Validators.required, Validators.email]],

    });

  }


  onSubmit(form: FormGroup) {

    this.basicInfo.addControl('representative', new FormGroup(form.controls));

    //set the next component visibilty to true
    this.LicencePage = true;

    //scroll to the top of page
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    //check social securty number

    //check social securty number
    //check registration number

  }

}
