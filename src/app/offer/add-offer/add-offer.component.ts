import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { TENDER } from 'src/app/Shared/Models/TENDER';
import { TENDER_CLASSIFICATION } from 'src/app/Shared/Models/TENDER_CLASSIFICATION';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { OfferService } from 'src/app/Shared/Services/OfferService/offer.service';
import { SpecificationService } from 'src/app/Shared/Services/SpecificationService/specification.service';
import { TenderService } from 'src/app/Shared/Services/TenderService/tender.service';
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
  type: string = "";
  LicencePage: boolean = false;
  next: boolean = false;
  supplier!: SUPPLIER;
  myFiles: string[] = [];
  tenerId: string;
  itemPerPage: number = 5
  page: number = 1
  page_size = 1;
  totalRecords: number;
  tenderClassification: TENDER_CLASSIFICATION[]=[];
  tender: TENDER ;
  data: any[] = [];
  totalAmount: number = 0;
  constructor(private tenderService: TenderService, private specificationService: SpecificationService, private route: ActivatedRoute, private _auth: AuthService, private fb: FormBuilder, private offerService: OfferService, private userService: UserService, private _router: Router) { }



  paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  loadMoreClassification() {
    this.page_size++;
    this.tenderClassification.push(...this.paginate(this.tender.tenderClassification, 3, this.page_size));

  }
  addItem(newItem) {
    let change = false;
    this.data.map((classification, index) => {
      if (classification.frontId == newItem.frontId) {
        this.data[index] = newItem;
        change = true
      }
      return classification
    })

    if (!change) this.data.push(newItem)

    console.log(this.data)
    this.totalAmount =0
    this.data.forEach((classification) => {
    
      this.totalAmount += parseInt(classification.amount);
    })
  }
  ngOnInit(): void {
    this.tenerId = this.route.snapshot.paramMap.get("id");

    this.tenderService.getTenderById(this.tenerId).subscribe(res => {
      let response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.tender = response.data;
      
      this.tenderClassification = response.data.tender.tenderClassification;
    })  


    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      representativeName: ['', [Validators.required]],
      socialSecurityNumber: ['', [Validators.required]],
      position: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      financial: ['', [Validators.required]],
      technical: ['', [Validators.required]],
      other: ['', [Validators.required]],

    });

  }

  async onFileChange(event: any) {
    const pdfBytePattern = "25504446"
    const fileHeader = await this.specificationService.getFileHeader(event.target.files[0]).then((res) => {

      if (res != pdfBytePattern) {
        Swal.fire('Error!', 'Please enter only pdf files.', 'error')
        event.target.value = null;

        this.myFiles.pop()

      } else {
        for (let i = 0; i < event.target.files.length; i++) {
          this.myFiles.push(event.target.files[i]);
        } }
    });
  }

  onSubmit(form: FormGroup) {

    this.basicInfo = form
    let supplierId: number;
    this.userService.FilterUserBy(this._auth.email.value).subscribe(res => {
      let response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      if (response.status) {
        let tenderId = this.route.snapshot.paramMap.get("id");
        supplierId = response.data[0].id;
        let offer: OFFER = new OFFER();
        console.log(form.value)
         let representative:REPRESENTATIVE =new REPRESENTATIVE();
        representative.email=form.get("email").value;
    
        representative.name=form.get("representativeName").value;
 
        representative.phone=form.get("phone").value;

        representative.position=form.get("position").value;

        representative.socialSecurityNumber=form.get("socialSecurityNumber").value;

        representative.socialSecurityNumberDate="09/09/2022";
        offer.representative=representative;

        offer.supplierId = supplierId;
        offer.tenderId = parseInt(tenderId);
        offer.totalMontant = this.totalAmount;
        offer.name = form.get("name").value;
        offer.offerClassification = this.data;
        console.log(offer)
        this.offerService.createOffer(offer).subscribe(res => {
          let NewOffer: RESPONSE = { status: res.status, message: res.message, data: res.data };

          const formData = new FormData();
          this.myFiles.forEach((file) => {

            formData.append('MyFile', file);

          });

          formData.append("AltText", "File")
          formData.append("Description", "Offer files")

          this.offerService.addSpecification(NewOffer.data.id.toString(), formData).subscribe(res => {

            let response2: RESPONSE = { status: res.status, message: res.message, data: res.data };
            if (response2.status) {
              Swal.fire(
                'Offer added successfully',
                '',
                'success'
              )
              this._router.navigate(['/tenders']);

            } else {
              Swal.fire(
                response2.message,
                '',
                'error'
              )
            }


          })
        })

      }


    })
  }

}
