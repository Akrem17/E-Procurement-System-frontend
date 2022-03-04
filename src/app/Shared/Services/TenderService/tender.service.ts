import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private tendersRoute=environment.apiUrl+"tenders" 
  
  constructor(private http:HttpClient) { }

  
  getTenders(user:any){
    return this.http.get(this.tendersRoute);
   }

}
