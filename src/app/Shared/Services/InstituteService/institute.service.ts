import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { INSTITUTE } from '../../Models/INSTITUTE';
import { INSTITUTE_FILTERS } from '../../Models/INSTITUTE_FILTERS';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  private instituteRoute=environment.apiUrl+Models.institute

  constructor(private http:HttpClient) { }

  getInstitutes(){
    return this.http.get(this.instituteRoute);
  }

  getInstituteById(id:string):Observable<any>{
    return this.http.get(this.instituteRoute+id);
  }

  updateInstitute(id:string,institute:INSTITUTE):Observable<any>{
    return this.http.put(this.instituteRoute+id,institute);
  }
  deleteInstitute(id:string){
    return this.http.delete(this.instituteRoute+id);
  }
  
  FilterInstituteBy(filters:INSTITUTE_FILTERS ){
    let filter="";
    Object.entries(filters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    return this.http.get(this.instituteRoute+"?"+filter);
  
  }
  GetTendersOfInstitute(instituteId:string,itemPerPage:number,page:number):Observable<any>{
    return this.http.get(this.instituteRoute+instituteId+'/tenders?skip='+itemPerPage+'&take='+page);

   }

  


}
