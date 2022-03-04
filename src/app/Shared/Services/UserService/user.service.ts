import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { USER } from '../../Models/USER';
type Nullable<T> = T | null;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersRoute=environment.apiUrl+"users/";

  constructor(private http:HttpClient) { }


getAllUsers(){

  this.http.get(this.usersRoute);

}
getUserById(id :string){

  return this.http.get(this.usersRoute+id);

}
updateUser(id:string,user:USER){
  return this.http.put(this.usersRoute+id,user);

}
deleteUser(id:string){
  return this.http.delete(this.usersRoute+id)

}
FilterUserBy(email:Nullable<string>=null,confirmed:Nullable<boolean>=null  ,date:Nullable<string> =null  ){
  let filters=email!=null?'?email='+email:''+confirmed!=null?'&confirmed='+confirmed:''+date!=null?'&date='+date:'';
return this.http.get(this.usersRoute+filters);

}

addUser(user:USER){

  return this.http.post(this.usersRoute,user);

}

}
