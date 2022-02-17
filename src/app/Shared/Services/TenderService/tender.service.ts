import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  private _tenders="https://localhost:7260/api/users"
  constructor(private http:HttpClient) { }

  
  getTenders(user:any){
    return this.http.get(this._tenders);
   }

}
