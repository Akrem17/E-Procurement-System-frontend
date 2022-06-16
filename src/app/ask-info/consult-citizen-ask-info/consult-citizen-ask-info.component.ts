import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as signalR from '@aspnet/signalr';
import { HubConnection } from '@aspnet/signalr';
import { Models } from 'src/app/endpoints';
import { ASK_INFO } from 'src/app/Shared/Models/ASK_INFO';
import { ASK_INFO_ANSWER } from 'src/app/Shared/Models/ASK_INFO_ANSWER';
import { ASK_INFO_FILTERS } from 'src/app/Shared/Models/ASK_INFO_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AskInfoAnswerService } from 'src/app/Shared/Services/AskInfoAnswerService/ask-info-answer.service';
import { AskInfoService } from 'src/app/Shared/Services/AskInfoService/ask-info.service';
import { AuthService } from 'src/app/Shared/Services/auth.service';
import { NotificationService } from 'src/app/Shared/Services/NotificationService/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consult-citizen-ask-info',
  templateUrl: './consult-citizen-ask-info.component.html',
  styleUrls: ['./consult-citizen-ask-info.component.css']
})
export class ConsultCitizenAskInfoComponent implements OnInit {

  messages: ASK_INFO_ANSWER[] = [];

  askForInfos: ASK_INFO[] = [];
  shownAskInfo!: ASK_INFO;
  answer: string = ""
  userType: string = ""
  notif: string = "notif";
  notifList: string[] = []
  
  private _hubConnection: HubConnection | undefined;

  answerCitizen() {

    this.authService.type.subscribe(res => {
      this.userType = res;
      let askInfoAnswer: ASK_INFO_ANSWER = new ASK_INFO_ANSWER()
      askInfoAnswer.message = this.answer;
      askInfoAnswer.askForInfoId = parseInt(this.shownAskInfo.id);
      askInfoAnswer.from = res;
      this.askInfoAnswerService.createAskInfo(askInfoAnswer).subscribe(res => {
        const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
        if (response.status) {

          this.shownAskInfo.askForInfoAnswer = askInfoAnswer;
          this.shownAskInfo.askForInfoAnswerId = parseInt(askInfoAnswer.id)
          this.answer = "";

        }
      })

    })
  }

  removeAskInfoFromNotif(AskInfoId:string){

    this.notifList = this.notifList.filter(x => x.toString() !== AskInfoId);
    this.notficationService.notificationNumber.next(this.notifList.length)
  }
  showAskOffer(askInfo: ASK_INFO) {
      askInfo.seen=true
      
      this.removeAskInfoFromNotif(askInfo.id.toString())
      if(askInfo.askForInfoAnswer)
      {
        askInfo.askForInfoAnswer.seen=true;
      this.askInfoAnswerService.updateAskInfoAnswer(askInfo.askForInfoAnswerId.toString(),askInfo.askForInfoAnswer)
      .subscribe(res=>{
      })
    }
       this.askInfoService.getAskInfoById(askInfo.id).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.shownAskInfo = response.data;
  
      this._hubConnection?.invoke("joinAskInfoChat", this.shownAskInfo.id.toString());


    })
  }
  //   this.user.getUserById(data.instituteId.toString()).subscribe(res => {
  //     const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

  //     if (response.data.email == resEmail) {
  //       this.messages.unshift(data)
  //       this.notificationsCount++;

  //     }
  //   });
  // })



  constructor(private route: ActivatedRoute,private notficationService:NotificationService, private authService: AuthService, private askInfoService: AskInfoService, private askInfoAnswerService: AskInfoAnswerService) { }

  ngOnInit(): void {
    console.log(this.notifList)
    let filters: ASK_INFO_FILTERS = new ASK_INFO_FILTERS();
    let id = this.route.snapshot.paramMap.get("id");
    filters.citizenId = id;
    
    this.askInfoService.getAskInfo(filters).subscribe(res => {
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      
      this.askForInfos = response.data
       console.log(  this.askForInfos)
    })
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.socketUrl + Models.socketURI, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.start().then(() => {
      console.log("connnntected to socket chat")


      this._hubConnection?.on('SendMessage', (data: ASK_INFO_ANSWER) => {
        let answer: ASK_INFO_ANSWER = new ASK_INFO_ANSWER();
        answer = data
        this.shownAskInfo.askForInfoAnswer = answer
        this.messages.push(data)
      })
      this._hubConnection?.invoke("joinAskInfoNotificationCitizen");


      this._hubConnection?.on('NewAnswer', (data: ASK_INFO_ANSWER) => {
        this.notifList.push(data.askForInfoId.toString())
        console.log(  this.notifList)

        this.notficationService.notificationNumber.next(this.notifList.length)

        let el = this.askForInfos.find(el => el.id == data.askForInfoId.toString())
        
        this.askForInfos = this.askForInfos.filter(x => x.id.toString() !== data.askForInfoId.toString());
        this.askForInfos.unshift(el)
        console.log(this.askForInfos)
      })


    }).catch(err => console.error(err.toString()));





  }

}
