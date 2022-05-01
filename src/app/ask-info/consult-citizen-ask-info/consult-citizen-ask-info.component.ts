import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { Models } from 'src/app/endpoints';
import { ASK_INFO } from 'src/app/Shared/Models/ASK_INFO';
import { ASK_INFO_ANSWER } from 'src/app/Shared/Models/ASK_INFO_ANSWER';
import { ASK_INFO_FILTERS } from 'src/app/Shared/Models/ASK_INFO_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AskInfoAnswerService } from 'src/app/Shared/Services/AskInfoAnswerService/ask-info-answer.service';
import { AskInfoService } from 'src/app/Shared/Services/AskInfoService/ask-info.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consult-citizen-ask-info',
  templateUrl: './consult-citizen-ask-info.component.html',
  styleUrls: ['./consult-citizen-ask-info.component.css']
})
export class ConsultCitizenAskInfoComponent implements OnInit {

  
askForInfos:ASK_INFO[]=[];
shownAskInfo!:ASK_INFO;
answer:string=""
private _hubConnection: HubConnection | undefined;
    
  answerCitizen(){
console.log(this.answer)
let askInfoAnswer:ASK_INFO_ANSWER= new ASK_INFO_ANSWER()
askInfoAnswer.message=this.answer;
askInfoAnswer.AskForInfoId=parseInt(this.shownAskInfo.id);
console.log(askInfoAnswer)
this.askInfoAnswerService.createAskInfo(askInfoAnswer).subscribe(res=>{
  const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
  if(response.status){
    this.shownAskInfo.askForInfoAnswer=askInfoAnswer;
    this.shownAskInfo.askForInfoAnswerId=parseInt(askInfoAnswer.id)
    this.answer="";

  }
})
    
  }
  showAskOffer(askInfo:ASK_INFO){
    
    this.askInfoService.getAskInfoById(askInfo.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.shownAskInfo=response.data;
      console.log(this.shownAskInfo)
      this._hubConnection?.invoke("joinAskInfoChat",this.shownAskInfo.id.toString());


    
  })}
          //   this.user.getUserById(data.instituteId.toString()).subscribe(res => {
          //     const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

          //     if (response.data.email == resEmail) {
          //       this.messages.unshift(data)
          //       this.notificationsCount++;

          //     }
          //   });
          // })
   
    
  
  constructor(private askInfoService:AskInfoService,private askInfoAnswerService:AskInfoAnswerService) { }

  ngOnInit(): void {

    let filters:ASK_INFO_FILTERS = new ASK_INFO_FILTERS();
    filters.citizenId="3";
    this.askInfoService.getAskInfo(filters).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.askForInfos=response.data

      console.log(res)
    })
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(environment.socketUrl + Models.socketURI, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this._hubConnection.start().then(() => {
      console.log("connnntected to socket chat")
      

      this._hubConnection?.on('SendMessage', (data: string) => {
        console.log(data)
  })
    }).catch(err => console.error(err.toString()));
  

    
 

  }


}
