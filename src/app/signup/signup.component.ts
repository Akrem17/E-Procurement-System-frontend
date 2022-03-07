import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Shared/Services/UserService/user.service';
import { ValidatorService } from '../Shared/Services/ValidatorService/validator.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  user!: FormGroup;
  type: string = "";
  emailExists = false;

  constructor(private fb: FormBuilder, private _user: UserService, private _validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this._validatorService.ValidatePassword]],
      passwordc: ['', [Validators.required, this._validatorService.ValidatePasswordConfirm]],
      type: ['', [Validators.required]],
    });
  }

  //error messages list
  get errorMessage(): string {
    const form: FormControl = (this.myForm.get('password') as FormControl);
    return form.hasError('required') ?
      'Password is required' :
      form.hasError('ValidatePassword') ?
        'Password length should be more than 8 caracters' :
        form.hasError('ValidatePassword') ?
          'Passowrdr' : '';
  }

  onSubmit(form: FormGroup) {
    //verify email exists or not 
    this._user.FilterUserBy(form.value.email).subscribe({
      next: (res) => {
        //@ts-ignore
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        if (!response.status) {

          this.emailExists = false;
          //get the type of user to render the next signup
          this.type = form.value.type;
          //pass the common user form to the next signup form
          this.user = form;
          //scroll to the top of page when loading the next page
          document.body.scrollTop = document.documentElement.scrollTop = 0;

        } else this.emailExists = true;

      },
      error: (er) => { console.log(er); }
    });

  }
}
