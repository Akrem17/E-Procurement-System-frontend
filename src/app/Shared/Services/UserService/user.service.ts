import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl="https://localhost:7260/api/users"
  constructor(private http:HttpClient) { }


getUsers(){

  this.http.get(this.usersUrl);

}

getUserBy(email?:string){
  console.log(email)
return this.http.get(this.usersUrl+'?email='+email);

}

}
