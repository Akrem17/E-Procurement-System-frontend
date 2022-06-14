import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
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
askForInfosSent:ASK_INFO[]=[];
shownAskInfo!:ASK_INFO;
answer:string=""
userType:string="bla";
notifList: string[] = []
display:boolean=false;
changeDisplay(){
  this.display=!this.display;
}

private _hubConnection: HubConnection | undefined;

  constructor(private route: ActivatedRoute,private notficationService:NotificationService, private authService: AuthService ,private askInfoService:AskInfoService,private askInfoAnswerService:AskInfoAnswerService) { 

  }
  removeAskInfoFromNotif(AskInfoId:string){
    this.notifList = this.notifList.filter(x => x.toString() !== AskInfoId);
    this.notficationService.notificationNumberInstitute.next(this.notifList.length)
  }
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");

    let askForInfoFilters:ASK_INFO_FILTERS = new ASK_INFO_FILTERS()
    console.log(this.userType)
    askForInfoFilters.instituteId=id;//get the id of user
    this.askInfoService.getAskInfo(askForInfoFilters).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
     let ask=[];
     let sent=[];
      response.data.forEach(element => {
          if (element.askForInfoAnswerId==null){
            console.log( element.createdAt)

             element.createdAt = new Date(parseInt( element.createdAt)).toTimeString();
             console.log( element.createdAt)
             element.createdAt=(element.createdAt.split(":")[0]+":"+element.createdAt.split(":")[1])
             ask.push(element)
             
            } 
          else{
            console.log( element.createdAt)

            element.createdAt= new Date(parseInt( element.createdAt)).toTimeString();
            console.log( element.createdAt)

            element.createdAt=(element.createdAt.split(":")[0]+":"+element.createdAt.split(":")[1])
            sent.push(element)

          }
      });
    
      this.askForInfos=ask
      this.askForInfosSent=sent

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

    console.log("lenaa")
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
    console.log(this.askForInfos)
    const indexOfObject = this.askForInfos.findIndex(object => {
      return object.id === this.shownAskInfo.id;
    });
    this.askForInfos.splice(indexOfObject, 1);
    this.shownAskInfo.seen=true;
    this.askForInfosSent.unshift(this.shownAskInfo)
    this.display=!this.display

    
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
      console.log(askInfo)
      //askInfo.createdAt=(askInfo.createdAt.split(":")[0]+":"+askInfo.createdAt.split(":")[1])
      console.log(this.askForInfos)
      console.log(this.askForInfosSent)
    this.askInfoService.updateeAskInfo(askInfo.id.toString(),askInfo)
    .subscribe(res=>{
      console.log(res)
    })
  
    this.askInfoService.getAskInfoById(askInfo.id).subscribe(res=>{
      
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      
      this.shownAskInfo=response.data;
      this.shownAskInfo.createdAt= new Date(parseInt(   this.shownAskInfo.createdAt)  ).toTimeString();

      this.shownAskInfo.createdAt=(this.shownAskInfo.createdAt.split(":")[0]+":"+this.shownAskInfo.createdAt.split(":")[1])

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
