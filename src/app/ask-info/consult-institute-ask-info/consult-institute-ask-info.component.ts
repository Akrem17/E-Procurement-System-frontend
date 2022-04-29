import { Component, OnInit } from '@angular/core';
import { ASK_INFO } from 'src/app/Shared/Models/ASK_INFO';
import { ASK_INFO_ANSWER } from 'src/app/Shared/Models/ASK_INFO_ANSWER';
import { ASK_INFO_FILTERS } from 'src/app/Shared/Models/ASK_INFO_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AskInfoAnswerService } from 'src/app/Shared/Services/AskInfoAnswerService/ask-info-answer.service';
import { AskInfoService } from 'src/app/Shared/Services/AskInfoService/ask-info.service';

@Component({
  selector: 'app-consult-institute-ask-info',
  templateUrl: './consult-institute-ask-info.component.html',
  styleUrls: ['./consult-institute-ask-info.component.css']
})
export class ConsultInstituteAskInfoComponent implements OnInit {

askForInfos:ASK_INFO[]=[];
shownAskInfo!:ASK_INFO;
answer:string=""
  constructor(private askInfoService:AskInfoService,private askInfoAnswerService:AskInfoAnswerService) { 

  }

  ngOnInit(): void {
    let askForInfoFilters:ASK_INFO_FILTERS = new ASK_INFO_FILTERS()
    askForInfoFilters.instituteId="1";//get the id of user
    this.askInfoService.getAskInfo(askForInfoFilters).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

      this.askForInfos=response.data
      

      console.log(this.askForInfos)
      


    })
  }
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
    

    })
  }

}
