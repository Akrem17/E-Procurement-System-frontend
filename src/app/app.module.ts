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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultTendersComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
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
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
