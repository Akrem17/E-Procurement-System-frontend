import { HttpErrorResponse } from '@angular/common/http';
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
  foundedUser:boolean=false;
  verifiedUser:boolean=false;
  verify:boolean=false;
  constructor(private fb: FormBuilder,private _auth:AuthService, private router:Router) {



     
      var verify=  this.router.getCurrentNavigation()?.extras.state
      //@ts-ignore
      this.verify=verify?.verify;
   }

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

    this._auth.loginUser(user).subscribe({
      next: (res) => { console.log(res)
    
        
        
      localStorage.setItem('token',res.tokenString)
      this.router.navigate(['./consulting']).then(()=>{
        this._auth.loggedIn();

      })
    
    }

        
      ,
      error: (e) =>{  if (e instanceof HttpErrorResponse) {
        if (e.status == 401) {
         this.foundedUser=true;
         this.verifiedUser=false;
         this.verify=false;
        
        
        }else if(e.status == 404){
          console.log(e)
          this.verifiedUser=true;
          this.foundedUser=false;
          this.verify=false;
        }
      
      
      }},
      complete: () => console.info('complete') 
  })
    
}
}
