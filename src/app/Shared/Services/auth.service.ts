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

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _registreUrl = environment.apiUrl + "signup/citizen";
  private _registreSupplier = environment.apiUrl + "signup/supplier";
  private _registreInstitute = environment.apiUrl + "signup/institute";
  private _loginUrl = environment.apiUrl + "login"


  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem('token') && localStorage.getItem('token') != 'undefined');
  public email: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('email'));
  public type: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('type'));
  //user!: TOKEN_INFO;

  constructor(private http: HttpClient, private router: Router,private userService:UserService) { }

  registreCitizen(citizen: CITIZEN) {
    return this.http.post<CITIZEN>(this._registreUrl, citizen);
  }

  loginUser(user: LOGIN) {
console.log( user)
    return this.http.post<LOGIN>(this._loginUrl, user);

  }


  loggedIn() {

    if (localStorage.getItem('token') && localStorage.getItem('token') != 'undefined')
    this.isUserLoggedIn.next(true);
    this.type.next(localStorage.getItem('type'))
    this.email.next(localStorage.getItem('email'))

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

  registreSupplier(supplier: SUPPLIER) {
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
