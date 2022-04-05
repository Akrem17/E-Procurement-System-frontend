import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { REPRESETATIVE_FILTERS } from 'src/app/Shared/Models/REPRESENTATIVE_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AddressService } from 'src/app/Shared/Services/AddressService/address.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { RepresentativeService } from 'src/app/Shared/Services/RepresentativeService/representative.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderClassificationService } from 'src/app/Shared/Services/TenderClassificationService/tender-classification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { EditTenderClassificationComponent } from 'src/app/tender/edit-tender/edit-tender-classification/edit-tender-classification.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit {

  animal: string;
  name: string;
  editFormTenderInfo: boolean = false;
  TenderInfoForm!: FormGroup;
  OfferInfoForm!: FormGroup;

  editFormRepresentative: boolean = false;
  RepresentativeForm!: FormGroup;

  tenderClassification: TENDER_CLASSIFICATION[] = [];
  page_size = 1;
  id!: string;
  offer!: OFFER;

  constructor(private _offerService: OfferService, private specificationService: SpecificationService, private tinderClassificationService: TenderClassificationService, public dialog: MatDialog, private representativeService: RepresentativeService, private tenderService: TenderService, private fb: FormBuilder, private route: ActivatedRoute, private addressService: AddressService) { }







  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");

    this._offerService.getSingleOffer(this.id).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.offer = response.data;
      console.log(this.offer.files[0])
      this.OfferInfoForm = this.fb.group({
        name: [this.offer.name, [Validators.required]],
        totalMontant: [this.offer.totalMontant, [Validators.required]]

      })
    })

  }

  //update tender info part 

  enableEditingOfferInfo() {

    this.editFormTenderInfo = true
  }
  saveOfferInfo(form) {
    console.log(form.value)
    let offer: OFFER = new OFFER();
    offer.name = form.value.name;this.offer.name=offer.name; offer.totalMontant = parseInt(form.value.totalMontant);this.offer.totalMontant=offer.totalMontant; offer.isAccepted = this.offer.isAccepted; offer.finalTotalMontant = this.offer.finalTotalMontant; offer.supplierId = this.offer.supplierId; offer.tenderId = this.offer.tenderId;
 
    this._offerService.updateOffer(this.offer.id.toString(), offer).subscribe({
      error: () => Swal.fire('Offer not updated ', '', 'error'),
      next: (res) => {
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        if (response.status) {
          Swal.fire('Updated successfully', '', 'success')
          this.editFormTenderInfo = false

        }
        else
          Swal.fire('Offer not updated ', '', 'error')
      }
    });
  }

    // get the file MIME type
    

  async addSpecification(e) {
    
    const formData = new FormData();
    console.log(e)
    formData.append('MyFile', e.target.files[0]);
    const pdfBytePattern = "25504446"
    const fileHeader = await this.specificationService. getFileHeader( e.target.files[0]).then((res)=>{
      console.log(res)
      if(res!=pdfBytePattern){
        Swal.fire('Error!', 'Please enter only pdf files.', 'error')

      }else{
        console.log(formData.get("MyFile"))
        formData.append("AltText", "gf")
        formData.append("Description", "gf")
        this._offerService.addSpecification(this.id, formData).subscribe(res => {
          console.log(this.id)
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          this.offer.files.push(res.data)
        })
      }

      })
      
    
  
  }


  deleteSpecification(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.specificationService.deleteSpecification(id).subscribe(res => {
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          if (response) {
            var removeIndex = this.offer.files.map(item => item.id).indexOf(id);
            this.offer.files.splice(removeIndex, 1);
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success')

          }
        })

      }
    })

  }
  
  niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     let l = 0, n = parseInt(x, 10) || 0;
     while(n >= 1024 && ++l){
         n = n/1024;
     }
     return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
   }
   
  downloadPDF(id) {

    this.specificationService.downloadSpecification(id).subscribe(file => {
      this.specificationService.getSpecifications(id).subscribe(res => {
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data }
        console.log(response.data)
        
        saveAs(file, response.data.fileName);
      })

    })


  }
}

