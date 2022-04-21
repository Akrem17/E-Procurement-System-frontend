import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Models } from 'src/app/endpoints';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-tender-specifications',
  templateUrl: './add-tender-specifications.component.html',
  styleUrls: ['./add-tender-specifications.component.css']
})
export class AddTenderSpecificationsComponent implements OnInit {

  @Input()
  basicInfo!: FormGroup;
  ngOnInit(): void {
  } 
  myFiles:string [] = [];
  
  myForm = new FormGroup({
   file: new FormControl('', [Validators.required])
 });
   
 constructor(private specificationService:SpecificationService, private _auth :AuthService,private tenderService:TenderService,private userService:UserService,private http: HttpClient,private _router:Router) { }
     
 get f(){
   return this.myForm.controls;
 }
    name:string[]=[];
 async onFileChange(event:any) {
  const pdfBytePattern = "25504446"

  const fileHeader = await this.specificationService. getFileHeader( event.target.files[0]).then((res)=>{

    if(res!=pdfBytePattern){
      Swal.fire('Error!', 'Please enter only pdf files.', 'error')
      event.target.value = null;

      this.myFiles.pop()
   


    }else{
      for (let  i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
    
    this.name=[];
    this.myFiles.forEach(e=>{
     //@ts-ignore
     this.name.push(e.name) 

   })
    }
      

 })
}
     
 removeFile(n){
  console.log(n)
  this.myFiles.splice(n,1)
  this.name=[];
  this.myFiles.forEach(e=>{
   //@ts-ignore
   this.name.push(e.name) 

 })

}
 submit(){
  
   const formData = new FormData();
   this.myFiles.forEach((file) => { formData.append('MyFile', file); });
  //formData.append("MyFile",this.myFiles);
  formData.append("AltText","gf")
  formData.append("Description","gf")


    //modeling address
    let adrress:ADDRESS = new ADDRESS();
    adrress.city =this.basicInfo.value.address.city; adrress.countryName = this.basicInfo.value.address.countryName; adrress.postalCode = this.basicInfo.value.address.postalCode; adrress.street1 = this.basicInfo.value.address.street1; adrress.street2 = this.basicInfo.value.address.street2;

  //modeling classification
    let tendersClass:TENDER_CLASSIFICATION[] =[];
    this.basicInfo.value.classification.classification.forEach(element => {
      let classification:TENDER_CLASSIFICATION = new TENDER_CLASSIFICATION();
      classification.amount=element.amount;classification.name=element.name;classification.description=element.description;classification.tenderId=element.tenderId
      tendersClass.push(classification)
    });
    

   //modeling representative

    let responsable:REPRESENTATIVE = new REPRESENTATIVE(); 
    responsable.email=this.basicInfo.value.responsable.email; responsable.name=this.basicInfo.value.responsable.name; responsable.phone=this.basicInfo.value.responsable.phone.toString(); responsable.position=this.basicInfo.value.responsable.position; responsable.socialSecurityNumber=this.basicInfo.value.responsable.socialSecurityNumber; responsable.socialSecurityNumberDate=this.basicInfo.value.responsable.socialSecurityNumberDate;
  
  //modeling tender
    let tender :TENDER = new TENDER();
    tender.addressReceipt=adrress;tender.responsible=responsable;tender.budget=this.basicInfo.value.budget;tender.tenderClassification=tendersClass;tender.businessKind=this.basicInfo.value.businessKind;tender.departement=this.basicInfo.value.departement;tender.evaluationMethod=this.basicInfo.value.evaluationMethod;tender.financing=this.basicInfo.value.evaluationMethod;tender.financing=this.basicInfo.value.financing;tender.name=this.basicInfo.value.name;tender.specificationURL=this.basicInfo.value.specificationURL;tender.startDate=this.basicInfo.value.startDate;tender.deadLine=this.basicInfo.value.deadLine;
    console.log(tender)

    this.userService.FilterUserBy(this._auth.email.value).subscribe(res=>{
       let response: RESPONSE = { status: res.status, message: res.message, data: res.data };
       if(response.status){
         
        tender.instituteId=response.data[0].id;
        //call specification service
        this.tenderService.postTender(tender).subscribe(res=>{
          if (res){
         
            this.specificationService.addSpecification(res.data.id,formData).subscribe(res=>{

              let response: RESPONSE = { status: res.status, message: res.message, data: res.data };


          Swal.fire(
            'Tender added successfully !',
            '',
            'success'
          )
            })
            this._router.navigate([Models.tenders]);

        }
       })
       }
       
    }
      );



  
 }

}
