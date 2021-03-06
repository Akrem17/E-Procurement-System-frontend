import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Models } from 'src/app/endpoints';
import Swal from 'sweetalert2';
import { ASK_INFO } from '../../Shared/Models/ASK_INFO';
import { CITIZEN_FILTERS } from '../../Shared/Models/CITIZEN_FILTERS';
import { RESPONSE } from '../../Shared/Models/RESPONSE';
import { TENDER } from '../../Shared/Models/TENDER';
import { AskInfoService } from '../../Shared/Services/AskInfoService/ask-info.service';
import { AuthService } from '../../Shared/Services/auth.service';
import { CitizenService } from '../../Shared/Services/CitizenService/citizen.service';
import { TenderService } from '../../Shared/Services/TenderService/tender.service';

@Component({
  selector: 'app-ask-info',
  templateUrl: './ask-info.component.html',
  styleUrls: ['./ask-info.component.css']
})
export class AskInfoComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(private askInfoService:AskInfoService, private _router:Router,private authService:AuthService, private citizenService:CitizenService, private fb: FormBuilder,private tenderService: TenderService ,private route: ActivatedRoute,) {


   }
  myForm!: FormGroup;
  panelOpenState:boolean=false;
  tenderId!:string;
  tender!:TENDER
  CitizenId!:number;
  ngOnInit(): void {

    this.myForm = this.fb.group({
      information: ['', [Validators.required]],
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
      this.CitizenId=response.data[0].id
     })
    })

    this.tenderService.getTenderById(this.tenderId).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.tender=response.data;
      console.log(this.tender)
    })
  }
  onSubmit(e){
    let askInfo:ASK_INFO = new  ASK_INFO();
    askInfo=e.value;
    askInfo.tenderId=parseInt(this.tenderId);
    askInfo.citizenId=this.CitizenId;
    
    console.log(askInfo)
    this.askInfoService.createAskInfo(askInfo).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response)
      if(response.status){
        Swal.fire(
          'Demand sent with success !',
          '',
          'success'
        ).then(res=>{
          this._router.navigate([Models.tenders]);

        })
      
      }else{
        Swal.fire(
          'Error while updating !',
          '',
          'error'
        )
      
      }
   
      
    })
    //naamel model fl angular(tansesh tzid attribut user)
    //backend
    
  }

}
