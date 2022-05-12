import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { Models } from 'src/app/endpoints';
import { ASK_INFO } from 'src/app/Shared/Models/ASK_INFO';
import { ASK_INFO_ANSWER } from 'src/app/Shared/Models/ASK_INFO_ANSWER';
import { ASK_INFO_FILTERS } from 'src/app/Shared/Models/ASK_INFO_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AskInfoAnswerService } from 'src/app/Shared/Services/AskInfoAnswerService/ask-info-answer.service';
import { AskInfoService, Fruit } from 'src/app/Shared/Services/AskInfoService/ask-info.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { NotificationService } from 'src/app/Shared/Services/NotificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consult-institute-ask-info',
  templateUrl: './consult-institute-ask-info.component.html',
  styleUrls: ['./consult-institute-ask-info.component.css']
})

export class ConsultInstituteAskInfoComponent implements OnInit {

askForInfos:ASK_INFO[]=[];
shownAskInfo!:ASK_INFO;
answer:string=""
userType:string="bla";
notifList: string[] = []

private _hubConnection: HubConnection | undefined;

  constructor(private notficationService:NotificationService, private authService: AuthService ,private askInfoService:AskInfoService,private askInfoAnswerService:AskInfoAnswerService) { 

  }
  removeAskInfoFromNotif(AskInfoId:string){
    this.notifList = this.notifList.filter(x => x.toString() !== AskInfoId);
    this.notficationService.notificationNumberInstitute.next(this.notifList.length)
  }
  ngOnInit(): void {

    let askForInfoFilters:ASK_INFO_FILTERS = new ASK_INFO_FILTERS()
    askForInfoFilters.instituteId="1";//get the id of user
    this.askInfoService.getAskInfo(askForInfoFilters).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.askForInfos=response.data
      console.log(this.askForInfos)
      console.log(this.notifList)

    })


    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(environment.socketUrl + Models.socketURI, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
    .configureLogging(signalR.LogLevel.Information)
    .build();

 
    this._hubConnection.start().then(() => {
      console.log("connnntected to socket chat")
  
      this._hubConnection?.invoke("joinAskInfoNotificationInstitute");



      this._hubConnection?.on('SendMessage', (data: ASK_INFO_ANSWER) => {
        console.log(data)
        this.messages.push(data)
  })

  this._hubConnection?.on('NewAsk', (data: ASK_INFO) => {
    console.log(data)
    this.askForInfos.push(data)
     this.notifList.push(data.id.toString())
     console.log( this.notifList)


     this.notficationService.notificationNumberInstitute.next(this.notifList.length)
    

      let el = this.askForInfos.find(el => el.id == data.id.toString())
      console.log(  el)

      this.askForInfos = this.askForInfos.filter(x => x.id.toString() !== data.id.toString());
      this.askForInfos.unshift(el)
     console.log(this.askForInfos)
  })

    }).catch(err => console.error(err.toString()));



  // this._hubConnection.on('Send', (data: NOTIFICATION) => {
  //   console.log(data)
  //   this.user.getUserById(data.instituteId.toString()).subscribe(res => {
  //     const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

  //     if (response.data.email == resEmail) {
  //       this.messages.unshift(data)
  //       this.notificationsCount++;

  //     }
  //   });
  // })


    
  }
  messages:ASK_INFO_ANSWER[]=[]
  answerCitizen(){

this.authService.type.subscribe(res=>{
  this.userType=res
  let askInfoAnswer:ASK_INFO_ANSWER= new ASK_INFO_ANSWER()
  askInfoAnswer.message=this.answer;
  askInfoAnswer.askForInfoId=parseInt(this.shownAskInfo.id);
  askInfoAnswer.from=res;
  this.askInfoAnswerService.createAskInfo(askInfoAnswer).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    if(response.status){
      this.shownAskInfo.askForInfoAnswer=askInfoAnswer;
      this.shownAskInfo.askForInfoAnswerId=parseInt(askInfoAnswer.id)
      this.answer="";
  
    }
  })

})
    
  }
  showAskOffer(askInfo:ASK_INFO){
    this.removeAskInfoFromNotif(askInfo.id)
    
      askInfo.seen=true;
    this.askInfoService.updateeAskInfo(askInfo.id.toString(),askInfo)
    .subscribe(res=>{
      console.log(res)
    })
  
    this.askInfoService.getAskInfoById(askInfo.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.shownAskInfo=response.data;
      console.log(this.shownAskInfo)
      this._hubConnection.invoke("joinAskInfoChat",this.shownAskInfo.id.toString());
      

    
  })}
          //   this.user.getUserById(data.instituteId.toString()).subscribe(res => {
          //     const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

          //     if (response.data.email == resEmail) {
          //       this.messages.unshift(data)
          //       this.notificationsCount++;

          //     }
          //   });
          // })
   
    
  

}
