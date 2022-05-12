import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { ASK_INFO } from '../../Models/ASK_INFO';
import { ASK_INFO_FILTERS } from '../../Models/ASK_INFO_FILTERS';

@Injectable({
  providedIn: 'root'
})
export class AskInfoService {

  private askInfoRoute=environment.apiUrl+Models.askInfo 

  
  constructor(private http:HttpClient) { }
  getAskInfo(askForInfoFilters:ASK_INFO_FILTERS):Observable<any>{
    let filter="";
    Object.entries(askForInfoFilters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    console.log(filter)
    return this.http.get(this.askInfoRoute+"?"+filter);
  }
  getAskInfoById(id:string):Observable<any>{
    return this.http.get(this.askInfoRoute+id);
  }
  
  createAskInfo(askInfo: ASK_INFO): Observable<any> {
    return this.http.post(this.askInfoRoute, askInfo);
  }
  updateeAskInfo(id:string,askInfo: ASK_INFO): Observable<any> {
    return this.http.put(this.askInfoRoute+id, askInfo);
  }

}
export type Fruit = "none" | "Apple" | "Banana";
