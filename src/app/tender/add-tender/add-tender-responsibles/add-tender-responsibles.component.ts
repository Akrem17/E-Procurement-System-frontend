import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { REPRESETATIVE_FILTERS } from 'src/app/Shared/Models/REPRESENTATIVE_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { RepresentativeService } from 'src/app/Shared/Services/RepresentativeService/representative.service';

@Component({
  selector: 'app-add-tender-responsibles',
  templateUrl: './add-tender-responsibles.component.html',
  styleUrls: ['./add-tender-responsibles.component.css']
})
export class AddTenderResponsiblesComponent implements OnInit {

  @Input()
  basicInfo!: FormGroup;
  
  myForm!: FormGroup;
  type:string="";
  position:string='';
  ClassificationPage:boolean=false;
  representative:REPRESENTATIVE= new REPRESENTATIVE();
  constructor(private fb: FormBuilder,private _representativeService:RepresentativeService) { }

  ngOnInit(): void {


    this.myForm = this.fb.group({
      name: ['',[Validators.required]],
      socialSecurityNumber: ['',Validators.required],
      position: ['', [Validators.required]],
      socialSecurityNumberDate: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.min(20000000), Validators.max(99999999)]],
      email: ['', [Validators.required,Validators.email]],

    });
    
  }

  
  onSubmit(form: FormGroup) {
   this.myForm.enable()
    Object.entries(this.myForm.getRawValue()).forEach(res=>{
      this.myForm.get(res[0]).setValue(res[1])
    }); 
    this.basicInfo?.addControl('responsable', new FormGroup(this.myForm.controls)); 
    const test= this.myForm.getRawValue().socialSecurityNumberDate.split("/")
    const date=new Date();
    date.setDate(test[1]);date.setMonth(test[0]-1);date.setFullYear(test[2])
    this.myForm.get("socialSecurityNumberDate").setValue(date)
        //set the next component visibilty to true
        this.ClassificationPage=true;
  
        //scroll to the top of page
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    
  }

  checkSocial(){    
     const representativeFilters:REPRESETATIVE_FILTERS= new REPRESETATIVE_FILTERS();
     representativeFilters.socialSecurityNumber=this.myForm.get("socialSecurityNumber").value;
     
     this._representativeService.FilterRepresentativeBy(representativeFilters).subscribe(res=>
      {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if(response.status){  
        this.representative.email=response.data[0].email;this.representative.name=response.data[0].name;this.representative.phone=response.data[0].phone;this.representative.position=response.data[0].position;this.representative.socialSecurityNumberDate=response.data[0].socialSecurityNumberDate;
        this.myForm.disable()
        this.myForm.get("socialSecurityNumber").enable();
        this.myForm.get("name").setValue(this.representative.name);this.myForm.get("position").setValue(this.representative.position);this.myForm.get("phone").setValue(this.representative.phone);this.myForm.get("email").setValue(this.representative.email); this.myForm.get("socialSecurityNumberDate").setValue(this.representative.socialSecurityNumberDate)
        }else{         
        this.myForm.enable()

      }
    })      
  }
}
 