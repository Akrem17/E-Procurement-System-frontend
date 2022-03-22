import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TENDER_CLASSIFICATION } from '../../Models/TENDER_CLASSIFICATION';

@Injectable({
  providedIn: 'root'
})
export class TenderClassificationService {
  private TCRoute=environment.apiUrl+"tenderClassifications/" 

  constructor(private http:HttpClient) { }
  updateTC(id:string,tc:TENDER_CLASSIFICATION){
    return this.http.put(this.TCRoute+id,tc);
  }
}
