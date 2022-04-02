import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import Swal from 'sweetalert2';
import { CITIZEN } from '../../Shared/Models/CITIZEN';
import { AuthService } from '../../Shared/Services/auth.service';

@Component({
  selector: 'app-citizen-signup',
  templateUrl: './citizen-signup.component.html',
  styleUrls: ['./citizen-signup.component.css']
})
export class CitizenSignupComponent implements OnInit {
  //get the user previous form
  @Input()
  user!: FormGroup;
  myForm!: FormGroup;
  type: string = "";

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.min(20000000), Validators.max(99999999)]],
      cin: ['', [Validators.min(10000000), Validators.max(30000000)]]

    });
  }
  onSubmit(form: FormGroup) {
    this.type = form.value.type;
    //create a citizen object
    var citizen: CITIZEN = new CITIZEN();
    citizen.email = this.user.get("email")?.value;citizen.password = this.user.get("password")?.value; citizen.type = this.user.get("type")?.value; citizen.firstName = form.value.firstname; citizen.lastName = form.value.lastname; citizen.phone = form.value.phone.toString(); citizen.cin = form.value.cin.toString();

    this._auth.registreCitizen(citizen).subscribe(
      {
        next: (res) => {
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

            if(response.status){
              Swal.fire(
                'Welcome to egovnez!',
                'signed up with success! please check your email',
                'success'
              ).then(()=>{
                    //the state sent with the navigate is to popup message to user to verify his email after sending him a confirmation email(catch it in login component)

                this._router.navigate(['/login'],{'state':{'verify':'true'}});
      
              }) }
                      
        },
        error: (er) => { console.log(er); }
      })
  }
}
