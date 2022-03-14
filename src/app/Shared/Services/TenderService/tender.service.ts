import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TENDER } from '../../Models/TENDER';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tendersRoute=environment.apiUrl+"tenders" 
  
  constructor(private http:HttpClient) { }

  
  getTenders(){
    return this.http.get(this.tendersRoute);
   }
   postTender(tender:TENDER){
    return this.http.post(this.tendersRoute,tender);
   }

}
