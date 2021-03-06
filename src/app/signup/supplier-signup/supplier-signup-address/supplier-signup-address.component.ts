import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ADDRESS } from 'src/app/Shared/Models/ADDRESS';
import { LICENCE } from 'src/app/Shared/Models/LICENCE';
import { REPRESENTATIVE } from 'src/app/Shared/Models/REPRESENTATIVE';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { SUPPLIER } from 'src/app/Shared/Models/SUPPLIER';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-signup-address',
  templateUrl: './supplier-signup-address.component.html',
  styleUrls: ['./supplier-signup-address.component.css']
})
export class SupplierSignupAddressComponent implements OnInit {
  myForm!: FormGroup;
  type: string = "";
  @Input()
  basicInfo!: FormGroup;
  next: boolean = false;
  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      // countryName: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street1: ['', [Validators.required]],
      // street2: ['', [Validators.required]],

    });

  }


  onSubmit(form: FormGroup) {

    this.basicInfo.addControl('address', new FormGroup(form.controls));

    //modeling address
    let adrress: ADDRESS = new ADDRESS();
    adrress.city = this.basicInfo.value.address.city;  adrress.postalCode = this.basicInfo.value.address.postalCode; adrress.street1 = this.basicInfo.value.address.street1;

    //modeling licence

    let licence: LICENCE = new LICENCE();
    licence.name = this.basicInfo.value.licence.name; licence.acquisitionDate = this.basicInfo.value.licence.acquisitionDate; licence.category = this.basicInfo.value.licence.category; licence.expirationDate = this.basicInfo.value.licence.expirationDate; licence.issuingInstitutionName = this.basicInfo.value.licence.issuingInstitutionName; licence.registrationNumber = this.basicInfo.value.licence.registrationNumber;

    //modeling representative

    let representative: REPRESENTATIVE = new REPRESENTATIVE();
    representative.email = this.basicInfo.value.representative.email; representative.name = this.basicInfo.value.representative.name; representative.phone = this.basicInfo.value.representative.phone.toString(); representative.position = this.basicInfo.value.representative.position; representative.socialSecurityNumber = this.basicInfo.value.representative.socialSecurityNumber; representative.socialSecurityNumberDate = this.basicInfo.value.representative.socialSecurityNumberDate;

    //modeling supplier

    let supplier: SUPPLIER = new SUPPLIER();
    supplier.address = adrress; supplier.licence = licence; supplier.representative = representative; supplier.buisnessClassification = this.basicInfo.value.buisnessClassification; supplier.buisnessType = this.basicInfo.value.buisnessType; supplier.category = this.basicInfo.value.category; supplier.cnssId = this.basicInfo.value.cnssId; supplier.companyName = this.basicInfo.value.companyName; supplier.email = this.basicInfo.value.user.email; supplier.fax = this.basicInfo.value.fax; supplier.password = this.basicInfo.value.user.password; supplier.phone = this.basicInfo.value.phone.toString(); supplier.registrationDate = this.basicInfo.value.registrationDate; supplier.registrationNumber = this.basicInfo.value.registrationNumber; supplier.replyEmail = this.basicInfo.value.replyEmail; supplier.supplierName = this.basicInfo.value.supplierName; supplier.taxId = this.basicInfo.value.taxId; supplier.type = this.basicInfo.value.user.type;


    this._auth.registreSupplier(supplier).subscribe(res => {

      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      if (response) {
        Swal.fire(
          'Welcome to egovnez!',
          'signed up with success! please check your email',
          'success'
        ).then(() => {
              //the verify is a boolean state to fire the need to verify email notification

          this._router.navigate(['/login'], { 'state': { 'verify': 'true' } });

        })
      }
    }
    )

  }

}
