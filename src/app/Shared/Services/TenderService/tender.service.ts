import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TENDER } from '../../Models/TENDER';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tendersRoute=environment.apiUrl+"tenders" 
  
  constructor(private http:HttpClient) { }

  
  getTenders(skip,page):Observable<any>{

    return this.http.get(this.tendersRoute+"?skip="+skip+"&"+"take="+page);

   }
   postTender(tender:TENDER):Observable<any>{
    return this.http.post(this.tendersRoute,tender);
   }

}
