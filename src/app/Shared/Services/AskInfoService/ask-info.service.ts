import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { ASK_INFO } from '../../Models/ASK_INFO';

@Injectable({
  providedIn: 'root'
})
export class AskInfoService {

  private askInfoRoute=environment.apiUrl+Models.askInfo 

  
  constructor(private http:HttpClient) { }
  getAskInfo(){
    return this.http.get(this.askInfoRoute);
  }
  getAskInfoById(id:string){
    return this.http.get(this.askInfoRoute+id);
  }
  
  createAskInfo(askInfo: ASK_INFO): Observable<any> {
    return this.http.post(this.askInfoRoute, askInfo);
  }

}
