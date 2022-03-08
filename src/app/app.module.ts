import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConsultTendersComponent } from './consult-tenders/consult-tenders.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './Shared/Services/auth.service';
import { AuthGuard } from './auth.guard';
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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultTendersComponent,
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
    InstituteSignupAddressComponent
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
    HttpClientModule

  ],
  providers: [AuthService,AuthGuard,UserService,CitizenService,
    {provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
    }
    
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
