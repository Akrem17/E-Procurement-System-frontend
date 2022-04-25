import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CITIZEN_FILTERS } from '../Shared/Models/CITIZEN_FILTERS';
import { RESPONSE } from '../Shared/Models/RESPONSE';
import { TENDER } from '../Shared/Models/TENDER';
import { AuthService } from '../Shared/Services/auth.service';
import { CitizenService } from '../Shared/Services/CitizenService/citizen.service';
import { TenderService } from '../Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-ask-info',
  templateUrl: './ask-info.component.html',
  styleUrls: ['./ask-info.component.css']
})
export class AskInfoComponent implements OnInit {

  constructor(private authService:AuthService, private citizenService:CitizenService, private fb: FormBuilder,private tenderService: TenderService ,private route: ActivatedRoute,) { }
  myForm!: FormGroup;
  panelOpenState:boolean=false;
  tenderId!:string;
  tender!:TENDER
  ngOnInit(): void {
    this.myForm = this.fb.group({
      info: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      fax: ['', [Validators.required]],
      email: ['', [Validators.required]],
      sendToEmail: [false, [Validators.required]],
      sendToAddress: [false, [Validators.required]],
      sendToChat: [true, [Validators.required]],

    });
    this.tenderId = this.route.snapshot.paramMap.get("id");
    this.authService.email.subscribe(res=>{
     
     //get by email 
     let citizenFilters:CITIZEN_FILTERS= new CITIZEN_FILTERS();
     citizenFilters.email=res;
     this.citizenService.FilterCitizenBy(citizenFilters).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response.data[0])
     })
    })
    this.tenderService.getTenderById(this.tenderId).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.tender=response.data;
      console.log(this.tender)
    })
  }
  onSubmit(e){
    console.log(e.value)

    //naamel model fl angular(tansesh tzid attribut user)
    //backend
    
  }

}
