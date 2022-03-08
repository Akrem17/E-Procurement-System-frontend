import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private _registreUrl=environment.apiUrl+"signup/citizen";
  private _registreSupplier=environment.apiUrl+"signup/supplier";
  private _registreInstitute=environment.apiUrl+"signup/institute";

  private _loginUrl=environment.apiUrl+"login"
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient, private router:Router) {}


   registreUser(user:any){
    return this.http.post<any>(this._registreUrl,user);
   }

   loginUser(user:any){

    return this.http.post<any>(this._loginUrl,user);

   }


   loggedIn(){

     if (localStorage.getItem('token') && localStorage.getItem('token')!='undefined' )
     this.isUserLoggedIn.next(true);
    
     return !!(localStorage.getItem('token')&&(localStorage.getItem('token') !='undefined')) ;
   }
   getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    this.isUserLoggedIn.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }
  registreSupplier(user:any){
    return this.http.post<any>(this._registreSupplier,user);
   }
   registerInstitute(user:any){
    return this.http.post<any>(this._registreInstitute,user);
   }

   
}
