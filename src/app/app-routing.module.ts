import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Shared/Services/GuardService/auth.guard';
import { HasRoleGuard } from './Shared/Services/GuardService/has-role.guard';
import { PreventLoggedInAccessGuard } from './Shared/Services/GuardService/prevent-logged-in-access.guard';
import { SignupComponent } from './signup/signup.component';
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
    path: 'consulting', component: ConsultTendersComponent,
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
    path: 'add-tender', component: AddTenderComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
