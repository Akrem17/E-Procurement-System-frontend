import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CITIZEN } from 'src/app/Shared/Models/CITIZEN';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { CitizenService } from 'src/app/Shared/Services/CitizenService/citizen.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-citizen',
  templateUrl: './edit-citizen.component.html',
  styleUrls: ['./edit-citizen.component.css']
})
export class EditCitizenComponent implements OnInit {




  myForm!: FormGroup;

  addressForm!: FormGroup;
  licenceForm!: FormGroup;
  representativeForm!: FormGroup;

  type:string="";
  LicencePage:boolean=false;
  next:boolean=false;
  citizen!:CITIZEN;
  myFiles:string [] = [];
  id!:string;
  constructor( private citzenService: CitizenService, private route: ActivatedRoute,private fb: FormBuilder,private userService:UserService,private _router:Router) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id)

    this.citzenService.getCitizenById(this.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if(response.status)
         this.citizen=response.data;
         console.log(  this.citizen)

        this.myForm = this.fb.group({
          firstName: [this.citizen?.firstName, [Validators.required]],
          lastName: [this.citizen.lastName, [Validators.required]],
          email: [this.citizen.email, [Validators.required]],
          cin: [this.citizen.cin, [Validators.required]],
          phone: [this.citizen.phone, [Validators.required]]
        });
  });
}


 updateInsitute(form){
   console.log(form.value)
  let c:CITIZEN;
  c=form.value;
  //s=form.value;s.addressId=this.institute.addressId;s.interlocutorId=this.institute.interlocutorId;s.password=this.institute.password;s.email=this.institute.email;s.type=this.institute.type;
  console.log(c)

  c.type=this.citizen.type;c.password=this.citizen.password

  this.citzenService.updateCitizen(this.id,c).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    console.log(response)
      if(response.status){
    Swal.fire(
      'Updated with success !',
      '',
      'success'
    )
  
  }else{
    Swal.fire(
      'Error while updating !',
      '',
      'error'
    )
  
  }
    
  })


 }


 


}
