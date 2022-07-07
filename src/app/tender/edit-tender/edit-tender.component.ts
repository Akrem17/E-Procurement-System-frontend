import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { REPRESETATIVE_FILTERS } from 'src/app/Shared/Models/REPRESENTATIVE_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AddressService } from 'src/app/Shared/Services/AddressService/address.service';
import { RepresentativeService } from 'src/app/Shared/Services/RepresentativeService/representative.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderClassificationService } from 'src/app/Shared/Services/TenderClassificationService/tender-classification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
import { EditTenderClassificationComponent } from './edit-tender-classification/edit-tender-classification.component';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { OFFER } from 'src/app/Shared/Models/OFFER';

@Component({
  selector: 'app-edit-tender',
  templateUrl: './edit-tender.component.html',
  styleUrls: ['./edit-tender.component.css']
})
export class EditTenderComponent implements OnInit {
  animal: string;
  name: string;
  tender!: TENDER;
  editFormTenderInfo: boolean = false;
  TenderInfoForm!: FormGroup;

  editFormRepresentative: boolean = false;
  RepresentativeForm!: FormGroup;

  tenderClassification: TENDER_CLASSIFICATION[] = [];
  page_size = 1;
  id!: string;
  data:OFFER[]=[];

  constructor(private specificationService:SpecificationService,private tinderClassificationService:TenderClassificationService, public dialog: MatDialog ,private representativeService: RepresentativeService, private tenderService: TenderService, private fb: FormBuilder, private route: ActivatedRoute, private addressService: AddressService) { }

  paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }


  loadMoreClassification() {
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender.tenderClassification, 3, this.page_size));

  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");


    this.tenderService.getTenderById(this.id).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      console.log(response)
      this.tender = response.data.tender;
      this.tender.startDate=moment(this.tender.startDate).utc().format('MM/DD/YYYY')
      this.tender.deadLine=moment(this.tender.deadLine).utc().format('MM/DD/YYYY')
      this.tender.addressReceipt.countryName="Tunisia"
      this.tender.responsible.socialSecurityNumberDate=moment(  this.tender.responsible.socialSecurityNumberDate).utc().format('MM/DD/YYYY')
      this.tenderClassification = this.paginate(this.tender.tenderClassification, 3, 1);
      this.data=this.tender.offers;
      this.RepresentativeForm = this.fb.group({
        name: [this.tender.responsible.name, [Validators.required]],
        socialSecurityNumber: [this.tender.responsible.socialSecurityNumber, [Validators.required]],
        position: [this.tender.responsible.position, [Validators.required]],
        socialSecurityNumberDate: [this.tender.responsible.socialSecurityNumberDate, [Validators.required]],
        phone: [this.tender.responsible.phone, [Validators.required]],
        email: [this.tender.responsible.email, [Validators.required]],

      });
      this.TenderInfoForm = this.fb.group({
        name: [this.tender.name, [Validators.required]],
        businessKind: [this.tender.businessKind, [Validators.required]],
        financing: [this.tender.financing, [Validators.required]],
        budget: [this.tender.budget, [Validators.required]],
        startDate: [this.tender.startDate, [Validators.required]],
        deadLine: [this.tender.deadLine, [Validators.required]],
        evaluationMethod: [this.tender.evaluationMethod, [Validators.required]],
        departement: [this.tender.departement, [Validators.required]],
        city: [this.tender.addressReceipt.city, [Validators.required]],
        postalCode: [this.tender.addressReceipt.postalCode, [Validators.required]],
        street1: [this.tender.addressReceipt.street1, [Validators.required]]
      });

    })


  

  }


  //update tender info part 

  enableEditingTenderInfo() {

    this.editFormTenderInfo = true
  }
  saveTenderInfo(form) {
    console.log(form.value)
    this.tender.name = form.value.name; this.tender.businessKind = form.value.businessKind; this.tender.financing = form.value.financing; this.tender.budget = form.value.budget; this.tender.evaluationMethod = form.value.evaluationMethod; this.tender.departement = form.value.departement; this.tender.startDate = form.value.startDate.toString(); this.tender.deadLine = form.value.deadLine.toString();

    let address: ADDRESS = new ADDRESS();
    address.city = form.value.city; this.tender.addressReceipt.city = address.city; address.postalCode = form.value.postalCode; this.tender.addressReceipt.postalCode = address.postalCode; address.street1 = form.value.street1; this.tender.addressReceipt.street1 = address.street1

    address.countryName = ""
    address.street2 = ""


    this.addressService.updateAddress(this.tender.addressReceiptId.toString(), address).subscribe(res => {

      console.log(res)
    })

    let updatedTender;
    updatedTender = { ...this.tender };
    updatedTender.addressReceipt = null;
    updatedTender.institute = null;
    updatedTender.responsible = null;




    this.tenderService.updateTender(this.id, updatedTender).subscribe(res => {

      this.editFormTenderInfo = false

    })



  }

  //update tender representative part 

  //this function is to find representative data by his social security number and add put it into the form
  checkSocial() {
    const representativeFilters: REPRESETATIVE_FILTERS = new REPRESETATIVE_FILTERS();
    representativeFilters.socialSecurityNumber = this.RepresentativeForm.get("socialSecurityNumber").value;
    let representative: REPRESENTATIVE = new REPRESENTATIVE();
    this.representativeService.FilterRepresentativeBy(representativeFilters).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if (response.status) {
        representative.email = response.data[0].email; representative.name = response.data[0].name; representative.phone = response.data[0].phone; representative.position = response.data[0].position; representative.socialSecurityNumberDate = response.data[0].socialSecurityNumberDate;
        this.RepresentativeForm.get("name").setValue(representative.name); this.RepresentativeForm.get("position").setValue(representative.position); this.RepresentativeForm.get("phone").setValue(representative.phone); this.RepresentativeForm.get("email").setValue(representative.email); this.RepresentativeForm.get("socialSecurityNumberDate").setValue(representative.socialSecurityNumberDate)
      }
    })
  }


  saveRepresentativeInfo(form) {
    let socialNumber;

    //search representative by social security number
    const representativeFilters: REPRESETATIVE_FILTERS = new REPRESETATIVE_FILTERS();
    representativeFilters.socialSecurityNumber = this.RepresentativeForm.get("socialSecurityNumber").value;
    let representative: REPRESENTATIVE = new REPRESENTATIVE();
    this.representativeService.FilterRepresentativeBy(representativeFilters).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      if (response.status) {
        socialNumber = res.data[0].socialSecurityNumber;
        if (this.tender.responsible.socialSecurityNumber == socialNumber) {

          //just update responsible
          representative.email = form.value.email; this.tender.responsible.email = form.value.email; representative.name = form.value.name; this.tender.responsible.name = form.value.name; representative.phone = form.value.phone; this.tender.responsible.phone = form.value.phone; representative.position = form.value.position; this.tender.responsible.position = form.value.position; representative.socialSecurityNumber = this.tender.responsible.socialSecurityNumber; representative.socialSecurityNumberDate = form.value.socialSecurityNumberDate; this.tender.responsible.socialSecurityNumberDate = form.value.socialSecurityNumberDate;
          this.representativeService.updateRepresentative(this.tender.responsible.id.toString(), representative).subscribe(res => {
            this.editFormRepresentative = false;
          })

        } else {

          //update representative info
          representative.email = form.value.email; this.tender.responsible.email = form.value.email; representative.name = form.value.name; this.tender.responsible.name = form.value.name; representative.phone = form.value.phone; this.tender.responsible.phone = form.value.phone; representative.position = form.value.position; this.tender.responsible.position = form.value.position; representative.socialSecurityNumber = form.value.socialSecurityNumber; this.tender.responsible.socialSecurityNumber = form.value.socialSecurityNumber; representative.socialSecurityNumberDate = form.value.socialSecurityNumberDate; this.tender.responsible.socialSecurityNumberDate = form.value.socialSecurityNumberDate;
          this.representativeService.updateRepresentative(response.data[0].id.toString(), representative).subscribe(res => {
            this.editFormRepresentative = false;
          })

          //update responsible foreign key in tender table;
          console.log("update responsible foreign key in tender table;")
          let updatedTender: TENDER;
          updatedTender = { ...this.tender };
          updatedTender.addressReceipt = null; updatedTender.institute = null; updatedTender.responsible = null;
          updatedTender.responsibleId = response.data[0].id;
          this.tenderService.updateTender(this.id, updatedTender).subscribe(res => {
            this.editFormRepresentative = false;
          })

        }

      } else {
        //if no social security number found,create new responsible and assign it to tender ; 

        console.log("/create new responsible and assign it to tender")
        representative.email = form.value.email; this.tender.responsible.email = form.value.email; representative.name = form.value.name; this.tender.responsible.name = form.value.name; representative.phone = form.value.phone; this.tender.responsible.phone = form.value.phone; representative.position = form.value.position; this.tender.responsible.position = form.value.position; representative.socialSecurityNumber = form.value.socialSecurityNumber; this.tender.responsible.socialSecurityNumber = form.value.socialSecurityNumber; representative.socialSecurityNumberDate = form.value.socialSecurityNumberDate; this.tender.responsible.socialSecurityNumberDate = form.value.socialSecurityNumberDate;

        //create new representative (because the social security number not found)
        this.representativeService.createRepresentative(representative).subscribe(res => {
          console.log(res.data.representative.id)

          console.log("update responsible foreign key in tender table;")
          let updatedTender: TENDER;
          updatedTender = { ...this.tender };
          updatedTender.addressReceipt = null; updatedTender.institute = null; updatedTender.responsible = null;
          updatedTender.responsibleId = res.data.representative.id;

          this.tenderService.updateTender(this.id, updatedTender).subscribe(res => {
            this.editFormRepresentative = false;
            //update responsible foreign key in tender table;
          })
          console.log(representative)
        })





      }
    })
  }

  enableEditingRepresentative() {

    this.editFormRepresentative = true
  }


  openDialog(classification): void {
    const dialogRef = this.dialog.open(EditTenderClassificationComponent, {
      width: '350px',
      data: { classification },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let classification: TENDER_CLASSIFICATION = this.tender.tenderClassification.find(x => x.id == result.id)
        classification.amount = result.amount;
        classification.name = result.name;
        classification.description = result.description;

        //update classification
        this.tinderClassificationService.updateTC(result.id, classification).subscribe(res => console.log(res))
      }
    });
  }


  addSpecification(e){
    const formData = new FormData();
    console.log(e)
    formData.append('MyFile', e.target.files[0]); 

    console.log(formData.get("MyFile"))
   formData.append("AltText","gf")
   formData.append("Description","gf")
   this.specificationService.addSpecification(this.id,formData).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    if (response.status)
    this.tender.specifications.push( response.data)
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
   
  deleteSpecification(id){

    // console.log(id)
 
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
        this.specificationService.deleteSpecification(id).subscribe(res=>{
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
         if(response.status){
          var removeIndex = this.tender.specifications.map(item => item.id).indexOf(id);
          this.tender.specifications.splice(removeIndex, 1);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
  
         }
        })
      
      }
    })
  
  }
  downloadPDF(id) {

    this.specificationService.downloadSpecification(id).subscribe(file => {
      this.specificationService.getSpecifications(id).subscribe(res => {
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data }
        console.log(response)
        saveAs(file, response.data.fileName);
      })

    })


  }
}

