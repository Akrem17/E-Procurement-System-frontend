import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registreUrl="https://localhost:7260/signup/citizen";
  private _loginUrl="https://localhost:7260/login"
  constructor(private http:HttpClient, private router:Router) {}


   registreUser(user:any){
    return this.http.post<any>(this._registreUrl,user);
   }

   loginUser(user:any){

    return this.http.post<any>(this._loginUrl,user);

   }


   loggedIn(){
     return !!localStorage.getItem('token');
   }
   getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])

  }
}
