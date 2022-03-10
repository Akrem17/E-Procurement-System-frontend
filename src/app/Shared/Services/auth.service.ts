import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USER } from '../Models/USER';
import { TOKEN_INFO } from '../Models/TOKEN_INFO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private _registreUrl=environment.apiUrl+"signup/citizen";
  private _registreSupplier=environment.apiUrl+"signup/supplier";
  private _registreInstitute=environment.apiUrl+"signup/institute";
  private _connectedUser=environment.apiUrl+"connected-user";
  private _loginUrl=environment.apiUrl+"login"


  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public email: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('email'));
  public type: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('type'));

  public connectedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user!:TOKEN_INFO;

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
     this.type.next(localStorage.getItem('type'))
     this.email.next(localStorage.getItem('email'))
     this.getConnectedUser(localStorage.getItem('token'));
    
     return !!(localStorage.getItem('token')&&(localStorage.getItem('token') !='undefined')) ;
   }
   getToken(){
    return localStorage.getItem('token');
  }

  logout(){

 
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
    this.isUserLoggedIn.next(false);
    this.type.next(localStorage.getItem('type'))
    this.email.next(localStorage.getItem('email'))
    this.router.navigate(['/login'])

  }

  getConnectedUser(token : string){

  
    this.user=new TOKEN_INFO();
    if(token){
    this.user.email=JSON.parse(atob(token?.split(".")[1]))?.Email
    this.user.type=JSON.parse(atob(token?.split(".")[1]))?.Type
  }
  }
  registreSupplier(supplier:any){
    return this.http.post<any>(this._registreSupplier,supplier);
   }
   registerInstitute(institute:any){
    return this.http.post<any>(this._registreInstitute,institute);
   }

   
}
