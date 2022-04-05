import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { REPRESENTATIVE } from '../../Models/REPRESENTATIVE';
import { REPRESETATIVE_FILTERS } from '../../Models/REPRESENTATIVE_FILTERS';

@Injectable({
  providedIn: 'root'
})
export class RepresentativeService {

  private representativesRoute=environment.apiUrl+Models.representative

  constructor(private http:HttpClient) { }

  getRepresentatives(){
    return this.http.get(this.representativesRoute);
  }

  // getInstituteById(id:string){
  //   return this.http.get(this.instituteRoute+id);
  // }

  // updateInstitute(id:string,institute:INSTITUTE){
  //   return this.http.put(this.instituteRoute+id,institute);
  // }
  // deleteInstitute(id:string){
  //   return this.http.delete(this.instituteRoute+id);
  // }
  
  FilterRepresentativeBy(filters:REPRESETATIVE_FILTERS ):Observable<any>{
    let filter="";
    Object.entries(filters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    return this.http.get(this.representativesRoute+"?"+filter);
  
  }

  updateRepresentative(id:string,representative:REPRESENTATIVE):Observable<any>{
    return this.http.put(this.representativesRoute+id,representative);


  }

  createRepresentative(representative:REPRESENTATIVE):Observable<any>{
    return this.http.post(this.representativesRoute,representative);
  }
  

}
