import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { ASK_INFO_ANSWER } from '../../Models/ASK_INFO_ANSWER';

@Injectable({
  providedIn: 'root'
})
export class AskInfoAnswerService {

  private askInfoAnswerRoute=environment.apiUrl+Models.AskForInfoAnswers 

  
  constructor(private http:HttpClient) { }
  
  createAskInfo(askInfoAnswer: ASK_INFO_ANSWER): Observable<any> {
    return this.http.post(this.askInfoAnswerRoute, askInfoAnswer);
  }
  updateAskInfoAnswer(id:string,askInfoAnswer: ASK_INFO_ANSWER): Observable<any> {
    return this.http.put(this.askInfoAnswerRoute+id, askInfoAnswer);
  }


}
