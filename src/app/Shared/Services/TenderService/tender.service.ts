import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { TENDER } from '../../Models/TENDER';
import { TENDER_FILTERS } from '../../Models/TENDER_FILTERS';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tendersRoute=environment.apiUrl+Models.tenders 
  
  constructor(private http:HttpClient) { }

  
  getTenders(skip,page):Observable<any>{

    return this.http.get(this.tendersRoute+"?skip="+skip+"&"+"take="+page);

   }
   postTender(tender:TENDER):Observable<any>{
    return this.http.post(this.tendersRoute,tender);
   }

   getTenderById(id:string):Observable<any>{

    return this.http.get(this.tendersRoute+id);
   }
   updateTender(id:string,tender:TENDER):Observable<any>{

    return this.http.put(this.tendersRoute+id,tender);
   }
   FilterTenderBy(filters:TENDER_FILTERS ):Observable<any>{
    let filter="";
    Object.entries(filters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    console.log(filters);
    return this.http.get(this.tendersRoute+"?"+filter);
  }
  extractResult(id:string):Observable<any>{
    return this.http.get(this.tendersRoute+id+"/extract");
  } 
  
}
