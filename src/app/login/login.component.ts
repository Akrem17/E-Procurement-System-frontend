import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required ]]
  
    });
  }


  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('password', form.value.password);
    console.log('Email', form.value.email);
  }
}
