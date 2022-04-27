import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './Shared/Services/auth.service';
import { TokenInterceptorService } from './Shared/Services/TokenService/token-interceptor.service';
import { UserService } from './Shared/Services/UserService/user.service';
import { CitizenSignupComponent } from './signup/citizen-signup/citizen-signup.component';
import { SupplierSignupComponent } from './signup/supplier-signup/supplier-signup.component';
import { CitizenService } from './Shared/Services/CitizenService/citizen.service';
import { SupplierSignupRepresentativeComponent } from './signup/supplier-signup/supplier-signup-representative/supplier-signup-representative.component';
import { SupplierSignupLicenceComponent } from './signup/supplier-signup/supplier-signup-licence/supplier-signup-licence.component';
import { SupplierSignupAddressComponent } from './signup/supplier-signup/supplier-signup-address/supplier-signup-address.component';
import { InstituteSignupComponent } from './signup/institute-signup/institute-signup.component';
import { InstituteSignupinterlocutorComponent } from './signup/institute-signup/institute-signupinterlocutor/institute-signupinterlocutor.component';
import { InstituteSignupAddressComponent } from './signup/institute-signup/institute-signup-address/institute-signup-address.component';
import { AuthGuard } from './Shared/Services/GuardService/auth.guard';
import { AddTenderComponent } from './tender/add-tender/add-tender.component';
import { AddTenderResponsiblesComponent } from './tender/add-tender/add-tender-responsibles/add-tender-responsibles.component';
import { RepresentativeService } from './Shared/Services/RepresentativeService/representative.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AddTenderAddressComponent } from './tender/add-tender/add-tender-address/add-tender-address.component';
import { AddTenderClassificationsComponent } from './tender/add-tender/add-tender-classifications/add-tender-classifications.component';
import { ConsultTendersComponent } from './tender/consult-tenders/consult-tenders.component';
import {MatTableModule} from '@angular/material/table';
import { ConsultSingleTenderComponent } from './tender/consult-single-tender/consult-single-tender.component';
import {MatListModule} from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EllipsisModule } from 'ngx-ellipsis';
import { CustomCardComponent } from './custom-card/custom-card.component';
import { TendersOfInstituteComponent } from './tender/tenders-of-institute/tenders-of-institute.component';
import { EditTenderComponent } from './tender/edit-tender/edit-tender.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditTenderClassificationComponent } from './tender/edit-tender/edit-tender-classification/edit-tender-classification.component';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { AddTenderSpecificationsComponent } from './tender/add-tender/add-tender-specifications/add-tender-specifications.component';
import { AddOfferComponent } from './offer/add-offer/add-offer.component';
import { ConsultOfferComponent } from './offer/consult-offer/consult-offer.component';
import { SupplierOffersComponent } from './offer/supplier-offers/supplier-offers.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { DatePipe } from '@angular/common';
import { LogInterceptorService } from './Shared/Services/LogService/log-interceptor.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { ConsultSupplierComponent } from './supplier/consult-supplier/consult-supplier.component';
import { ConsultInstituteComponent } from './institute/consult-institute/consult-institute.component';
import { EditInstituteComponent } from './institute/edit-institute/edit-institute.component';
import { OfferClassificationCardComponent } from './custom-card/offer-classification-card/offer-classification-card.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { AskInfoComponent } from './ask-info/addAskInfo/ask-info.component';
import { ConsultInstituteAskInfoComponent } from './ask-info/consult-institute-ask-info/consult-institute-ask-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CitizenSignupComponent,
    SupplierSignupComponent,
    SupplierSignupRepresentativeComponent,
    SupplierSignupLicenceComponent,
    SupplierSignupAddressComponent,
    InstituteSignupComponent,
    InstituteSignupinterlocutorComponent,
    InstituteSignupAddressComponent,
    AddTenderComponent,
    AddTenderResponsiblesComponent,
    AddTenderClassificationsComponent,
    AddTenderAddressComponent,
    ConsultTendersComponent,
    ConsultSingleTenderComponent,
    CustomCardComponent,
    TendersOfInstituteComponent,
    EditTenderComponent,
    EditTenderClassificationComponent,
    AddTenderSpecificationsComponent,
    AddOfferComponent,
    ConsultOfferComponent,
    SupplierOffersComponent,
    EditOfferComponent,
    ErrorPageComponent,
    EditSupplierComponent,
    ConsultSupplierComponent,
    ConsultInstituteComponent,
    EditInstituteComponent,
    OfferClassificationCardComponent,
    AskInfoComponent,
    ConsultInstituteAskInfoComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    EllipsisModule ,
    MatDialogModule,
    FormsModule,
    MdbCheckboxModule,
    MatCheckboxModule,
    MatExpansionModule
    
    
    
  ],
  providers: [AuthService,AuthGuard,UserService,CitizenService,RepresentativeService,
    {provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
    },DatePipe,
    {provide:HTTP_INTERCEPTORS,
      useClass:LogInterceptorService,
      multi:true
      }
    
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
