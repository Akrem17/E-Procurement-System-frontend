import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { CITIZEN } from '../../Models/CITIZEN';
import { CITIZEN_FILTERS } from '../../Models/CITIZEN_FILTERS';
type Nullable<T> = T | null;

@Injectable({
  providedIn: 'root'
})
export class CitizenService {
  private citizenRoute=environment.apiUrl+Models.citizen; 

  constructor(private http:HttpClient) { }

  getCitizen(){
    return this.http.get(this.citizenRoute);
  }

  getCitizenById(id:string){
    return this.http.get(this.citizenRoute+id);
  }

  updateCitizen(id:string,institute:CITIZEN){
    return this.http.put(this.citizenRoute+id,institute);
  }
  deleteCitizen(id:string){
    return this.http.delete(this.citizenRoute+id);
  }

  FilterCitizenBy(filters:CITIZEN_FILTERS ){
    let filter="";
    Object.entries(filters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    });    
     //let filters=email!=null?'email='+email:'';filters+=confirmed!=null?'&confirmed='+confirmed:'';filters+=date!=null?'&date='+date:'';filters+=cin!=null?'&cin='+cin:'';filters+=phone!=null?'&phone='+phone:'';
     //email:Nullable<string>=null,confirmed:Nullable<boolean>=null ,cin:Nullable<string> =null ,phone:Nullable<string> =null ,date:Nullable<string> =null 

    return this.http.get(this.citizenRoute+"?"+filter);
  
  }
}
