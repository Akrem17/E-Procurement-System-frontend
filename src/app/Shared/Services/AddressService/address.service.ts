import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ADDRESS } from '../../Models/ADDRESS';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressRoute=environment.apiUrl+"addresses/" 

  
  constructor(private http:HttpClient) { }

  getAddressById(id:string){
    return this.http.get(this.addressRoute+id);
  }
  updateAddress(id:string,address:ADDRESS){
    return this.http.put(this.addressRoute+id,address);
  }
}
