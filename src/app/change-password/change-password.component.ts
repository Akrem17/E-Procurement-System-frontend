import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../endpoints';
import { LOGIN } from '../Shared/Models/LOGIN';
import { RESPONSE } from '../Shared/Models/RESPONSE';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  
  myForm!: FormGroup;
  verifiedUser: boolean = false;
  verifyEmail: boolean = false;
  error: boolean = false;
  errorMessage!: string;
  endpointsAuth=Auth;
  codeVerification:boolean=false;
  password:boolean=false;
  token:string="";
  code:string;
  constructor(private authSerivce:AuthService, private fb: FormBuilder, private _auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.email]],
      passwordConfirmation: ['', [Validators.required]]});
 
  }


  onSubmit(form: FormGroup) {
    this.authSerivce.email.subscribe(res=>{
      let log= new LOGIN()

      log.email=res
      log.password=form.value.oldPassword;
      this.authSerivce.loginUser(log).subscribe(res=>{
        if(res.status){
          
        }
        console.log( res);

      })

    })
    

          
}

}