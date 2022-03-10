import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN } from '../Shared/Models/LOGIN';
import { AuthService } from '../Shared/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  myForm!: FormGroup;
  verifiedUser: boolean = false;
  verifyEmail: boolean = false;
  error: boolean = false;
  errorMessage!: string;


  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {

    //this will fire a message to user to verify his email after being redirected from signup user after signup
    var singupComponentExtras = this.router.getCurrentNavigation()?.extras.state;
    //if user came from singup component after successfully signup this verifyEmail will be true it will fire a message to check email
    //@ts-ignore
    this.verifyEmail = singupComponentExtras?.verify;

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }


  onSubmit(form: FormGroup) {
    var login: LOGIN = new LOGIN();
    login.email = form.value.email;
    login.password = form.value.password;
    this.loginUser(login)
  }




  loginUser(userLogin: LOGIN) {
    this._auth.loginUser(userLogin).subscribe({
      next: (res) => {

        //@ts-ignore
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

        if (response.status) {

          localStorage.setItem('token', response.data.tokenString)
          localStorage.setItem('email', response.data.loggedUser.email)
          localStorage.setItem('type', response.data.loggedUser.type)

          this.router.navigate(['./consulting']).then(() => {
            this._auth.loggedIn();

          })
        } else {

          //in case of error from backend
          this.error = true;
          //get the error message 
          this.errorMessage = response.message.split('.')[1];
          this.verifiedUser = false;
          this.verifyEmail = false;
        }
      },
      error: (e) => {
        //handle forbidden request
        if (e instanceof HttpErrorResponse) {
          if (e.status == 403) {
            this.verifiedUser = true;
            this.verifyEmail = false;

          }
        }
      }
    })
  }
}
