import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { UserService } from 'src/app/Shared/Services/UserService/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {


  basicInfo!: FormGroup;
  tenderInfo!: FormGroup;
  part2Form!: FormGroup;
  myForm!: FormGroup;
  type:string="";
  LicencePage:boolean=false;
  next:boolean=false;
  supplier!:SUPPLIER;
  myFiles:string [] = [];

  constructor(private route: ActivatedRoute,private _auth :AuthService,private fb: FormBuilder,private offerService:OfferService,private userService:UserService,private _router:Router) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      totalAmount: ['', [Validators.required]],
      financial: ['', [Validators.required]],
      technical: ['', [Validators.required]],
      other: ['', [Validators.required]],

    });
    
  }
  onFileChange(event:any) {
    for (let  i = 0; i < event.target.files.length; i++) { 
        this.myFiles.push(event.target.files[i]);
    }
    

}
  
  
  onSubmit(form: FormGroup) {
    
    console.log(form)
    this.basicInfo=form
      //set the next component visibilty to true
     // this.next=true;
         //scroll to the top of page
   // document.body.scrollTop = document.documentElement.scrollTop = 0;
   let supplierId:number;
   this.userService.FilterUserBy(this._auth.email.value).subscribe(res=>{
    let response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    if(response.status){
      let tenderId = this.route.snapshot.paramMap.get("id");
      supplierId=response.data[0].id;
      console.log(supplierId)
     let offer:OFFER = new OFFER();
     offer.supplierId=supplierId;
     offer.tenderId=parseInt(tenderId);
     offer.totalMontant=form.get("totalAmount").value;
     
     offer.name=form.get("name").value;
     console.log(offer);
     
      this.offerService.createOffer(offer).subscribe(res=>{
        let NewOffer: RESPONSE = { status: res.status, message: res.message, data: res.data };

        console.log(NewOffer)
        
        const formData = new FormData();
        console.table(this.myFiles)
        this.myFiles.forEach((file) => { formData.append('MyFile', file); });
        
        formData.append("AltText", "File")
        formData.append("Description", "Offer files")
      

        this.offerService.addSpecification(NewOffer.data.id.toString(),formData).subscribe(res=>{
          let response2: RESPONSE = { status: res.status, message: res.message, data: res.data };
          if (response2.status){
            Swal.fire(
              'Offer added successfully',
              '',
              'success'
            )
            this._router.navigate(['/consulting']);

          }else{
            Swal.fire(
              response2.message,
              '',
              'error'
            )
          console.log(res)
          }
           
        
        })
      })


    }


  })
}

}
