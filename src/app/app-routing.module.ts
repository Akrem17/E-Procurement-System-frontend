import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AskInfoComponent } from './ask-info/ask-info.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ConsultInstituteComponent } from './institute/consult-institute/consult-institute.component';
import { EditInstituteComponent } from './institute/edit-institute/edit-institute.component';
import { LoginComponent } from './login/login.component';
import { AddOfferComponent } from './offer/add-offer/add-offer.component';
import { ConsultOfferComponent } from './offer/consult-offer/consult-offer.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { SupplierOffersComponent } from './offer/supplier-offers/supplier-offers.component';
import { AuthGuard } from './Shared/Services/GuardService/auth.guard';
import { HasRoleGuard } from './Shared/Services/GuardService/has-role.guard';
import { PreventLoggedInAccessGuard } from './Shared/Services/GuardService/prevent-logged-in-access.guard';
import { SignupComponent } from './signup/signup.component';
import { ConsultSupplierComponent } from './supplier/consult-supplier/consult-supplier.component';
import { EditSupplierComponent } from './supplier/edit-supplier/edit-supplier.component';
import { AddTenderComponent } from './tender/add-tender/add-tender.component';
import { ConsultSingleTenderComponent } from './tender/consult-single-tender/consult-single-tender.component';
import { ConsultTendersComponent } from './tender/consult-tenders/consult-tenders.component';
import { EditTenderComponent } from './tender/edit-tender/edit-tender.component';
import { TendersOfInstituteComponent } from './tender/tenders-of-institute/tenders-of-institute.component';

const routes: Routes = [


  {
    path: 'login',
    canActivate: [PreventLoggedInAccessGuard],
    component: LoginComponent
  },
  {
    path: 'signup',
    canActivate: [PreventLoggedInAccessGuard],
    component: SignupComponent
  },
  {
    path: 'tenders', component: ConsultTendersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  },

  {
    path: 'tender/:id',
    canActivate: [AuthGuard],
    component: ConsultSingleTenderComponent
  },
  {
    path: '',
    canActivate: [PreventLoggedInAccessGuard],
    component: HomeComponent
  }
  ,
  {
    path: 'error',
    canActivate: [],
    component: ErrorPageComponent
  }
  ,
  {
    path: 'add-tender', component: AddTenderComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,

  
  {
    path: 'supplier/:id/offers', component: SupplierOffersComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  
  {
    path: 'supplier/:id/edit', component: EditSupplierComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  
  
  {
    path: 'tender/:id/information', component: AskInfoComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  
  {
    path: 'institute/:id/edit', component: EditInstituteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  
  
  {
    path: 'institute/:id', component: ConsultInstituteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  {
    path: 'supplier/:id', component: ConsultSupplierComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  {
    path: 'offer/add/:id', component: AddOfferComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  
  {
    path: 'offer/edit/:id', component: EditOfferComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  
  {
    path: 'tender/edit/:id', component: EditTenderComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  {
    path: 'tenders/:id', component: TendersOfInstituteComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    }
  }
  ,
  {
    path: 'offers/:id', component: ConsultOfferComponent,
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      type: ['citizen', 'institute', 'supplier']
    
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
