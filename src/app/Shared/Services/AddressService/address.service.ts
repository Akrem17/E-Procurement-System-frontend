import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { ADDRESS } from '../../Models/ADDRESS';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private addressRoute=environment.apiUrl+Models.address 

  
  constructor(private http:HttpClient) { }

  getAddressById(id:string){
    return this.http.get(this.addressRoute+id);
  }
  updateAddress(id:string,address:ADDRESS):Observable<any>{
    return this.http.put(this.addressRoute+id,address);
  }
}
