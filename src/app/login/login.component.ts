import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private fb: FormBuilder,private _auth:AuthService, private router:Router) { }

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
    this.loginUser({"email":form.value.email,"password":form.value.password})
  }


  loginUser(user:any){

    this._auth.loginUser(user).subscribe(
      
      (res)=>{
        console.log('token',res.value.tokenString)
        localStorage.setItem('token',res.value.tokenString)
        this.router.navigate(['/consulting'])      
      }
       
        );
  }
}
