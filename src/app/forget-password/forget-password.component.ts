import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../endpoints';
import { LOGIN } from '../Shared/Models/LOGIN';
import { RESPONSE } from '../Shared/Models/RESPONSE';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

 

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
  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {

    
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    });



 
  }


  onSubmit(form: FormGroup) {

                         //@ts-ignore
    if(form.controls.code.status=="DISABLED"){

                        //@ts-ignore
      console.log(form.controls.email.value)

                     //@ts-ignore
      this._auth.changePassword(form.controls.email.value,form.value.password,form.value.passwordConfirm,this.token).subscribe(res=>{

        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        if(response.status){
          Swal.fire(
            response.message,
            '',
            'success'
          ).then(res=>{
            this.router.navigate(["/login"]);
          })
        }else{
          if(response.message="message.Token not verified"){
            Swal.fire(
              "session expired",
              '',
              'error'
            ).then(res=>{
              window.location.reload();

            })
          }else{
          Swal.fire(
            response.message,
            '',
            'error'
          )
        }
        }
      })

    }

             //@ts-ignore
             if(form.controls.email.status=="DISABLED" && form.controls.code.status!="DISABLED"){
               //@ts-ignore
               this._auth.verifyCode(form.controls.email.value,form.value.code.toString()).subscribe(res=>{
                const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
                console.log(response)
                if(response.status){
                  this.token=response.data.token;
                  form.get('code').disable();
                  this.password=true;
               
                }else {
                  Swal.fire(
                    response.message,
                    '',
                    'error'
                  ).then(res=>{
                    window.location.reload();
                  })
                }
               })
              //if(  this.code==form.value.code.toString()
              
             }
             //@ts-ignore
             if(form.controls.email.status!="DISABLED"){
    this._auth.resetPassword(form.value.email).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if(response.status){
        Swal.fire(
          "code sent to your email",
          '',
          'success'
        )
        this.codeVerification=true;
          this.code=response.data.code
        form.get('email').disable();



      }else{
        Swal.fire(
          response.message,
          '',
          'error'
        )
      }

      console.log(res)
    })
  }
}


}
 