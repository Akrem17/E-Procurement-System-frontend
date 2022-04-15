import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TOKEN_INFO } from '../Models/TOKEN_INFO';
import { CITIZEN } from '../Models/CITIZEN';
import { LOGIN } from '../Models/LOGIN';
import { SUPPLIER } from '../Models/SUPPLIER';
import { INSTITUTE } from '../Models/INSTITUTE';
import { UserService } from './UserService/user.service';
import { Auth } from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _registreUrl = environment.apiUrl +Auth.signupSupplier;
  private _registreSupplier = environment.apiUrl + Auth.signupSupplier;
  private _registreInstitute = environment.apiUrl +Auth.signupInstitute;
  private _loginUrl = environment.apiUrl +Auth.login;


  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') && localStorage.getItem('token') != 'undefined');
  public email: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('email'));
  public type: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('type'));
  //user!: TOKEN_INFO;

  constructor(private http: HttpClient, private router: Router,private userService:UserService) { }

  registreCitizen(citizen: CITIZEN) :Observable<any>{
    return this.http.post<CITIZEN>(this._registreUrl, citizen);
  }

  loginUser(user: LOGIN):Observable<any> {
    return this.http.post<LOGIN>(this._loginUrl, user);

  }


  loggedIn() {

    if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined')
    this.isUserLoggedIn.next(true);
    this.type.next(localStorage.getItem('type'))
   // this.email.next(localStorage.getItem('email')) //hedhi nahit'ha khatr email traja3 twice as observable 

    return !!(localStorage.getItem('token') && (localStorage.getItem('token') != 'undefined'));
  }
  getToken() {
    return localStorage.getItem('token');
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
    this.isUserLoggedIn.next(false);
    this.type.next(localStorage.getItem('type'))
    this.email.next(localStorage.getItem('email'))
    this.router.navigate(['/login'])

  }

  registreSupplier(supplier: SUPPLIER) :Observable<any>{
    return this.http.post<any>(this._registreSupplier, supplier);
  }
  registerInstitute(institute: INSTITUTE) {
    return this.http.post<any>(this._registreInstitute, institute);
  }

  
  // getConnectedUser(token: string) {
   // this.getConnectedUser(localStorage.getItem('token'));
  //   this.user = new TOKEN_INFO();
  //   if (token) {
  //     this.user.email = JSON.parse(atob(token?.split(".")[1]))?.Email
  //     this.user.type = JSON.parse(atob(token?.split(".")[1]))?.Type
  //   }
  // }


}
