import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CITIZEN } from '../Shared/Models/CITIZEN';
import { AuthService } from '../Shared/Services/auth.service';
import { GlobalConstants } from '../Shared/user-type';

@Component({
  selector: 'app-citizen-signup',
  templateUrl: './citizen-signup.component.html',
  styleUrls: ['./citizen-signup.component.css']
})
export class CitizenSignupComponent implements OnInit {

  @Input()
  x!: FormGroup;
 
  myForm!: FormGroup;
  formCitizen!: FormGroup;
  type:string="";

  constructor(private fb: FormBuilder, private _auth :AuthService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required ]],
      phone: ['', [Validators.required, Validators.min(20000000), Validators.max(99999999) ]],
      cin: ['',[ Validators.min(10000000), Validators.max(30000000)]]
  
    });

  }
  ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {

    if (control.value && control.value.length<8 ) {
      return { 'ValidatePassword': true };
    }
    return null;
  }
  
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('password', form.value.password);
    console.log('Email', form.value.email);
    console.log('Email', form.value.type);
    this.type=form.value.type;
    console.log(  GlobalConstants.usertype) 
   // this.formCitizen=new FormGroup({userInfo:form,citizenInfo:this.x})
   // console.log(this.formCitizen.value
    console.log(this.x.get("email")?.value)
     
     

        
        
     
       var citizen:CITIZEN = new CITIZEN();
        citizen.email=this.x.get("email")?.value;
        citizen.password=this.x.get("password")?.value;
        citizen.type=this.x.get("type")?.value;
        citizen.firstName=form.value.firstname;
        citizen.lastName=form.value.lastname;
        citizen.phone=form.value.phone.toString();
        citizen.cin=form.value.cin.toString();
        console.log(citizen);

        
        
    this.registerUser(citizen);
  }


  registerUser( citizen:CITIZEN){
    this._auth.registreUser(citizen).subscribe(res=>console.log(res))
  }
}
