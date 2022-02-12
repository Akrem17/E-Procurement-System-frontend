import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../Shared/user-type';

@Component({
  selector: 'app-citizen-signup',
  templateUrl: './citizen-signup.component.html',
  styleUrls: ['./citizen-signup.component.css']
})
export class CitizenSignupComponent implements OnInit {

  @Input()
  x!: string;
 
  myForm!: FormGroup;
  type:string="";
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required ]],
      passwordc: ['', [Validators.required ]],
      type: ['', [Validators.required ]]
  
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('password', form.value.password);
    console.log('Email', form.value.email);
    console.log('Email', form.value.type);
    this.type=form.value.type;
    console.log(  GlobalConstants.usertype) 

  }
}
