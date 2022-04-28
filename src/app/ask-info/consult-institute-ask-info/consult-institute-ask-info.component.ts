import { Component, OnInit } from '@angular/core';
import { ASK_INFO } from 'src/app/Shared/Models/ASK_INFO';
import { ASK_INFO_FILTERS } from 'src/app/Shared/Models/ASK_INFO_FILTERS';
import { RESPONSE } from 'src/app/Shared/Models/RESPONSE';
import { AskInfoService } from 'src/app/Shared/Services/AskInfoService/ask-info.service';

@Component({
  selector: 'app-consult-institute-ask-info',
  templateUrl: './consult-institute-ask-info.component.html',
  styleUrls: ['./consult-institute-ask-info.component.css']
})
export class ConsultInstituteAskInfoComponent implements OnInit {

askForInfos:ASK_INFO[]=[];
shownAskInfo!:ASK_INFO;
  constructor(private askInfoService:AskInfoService) { 

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

  showAskOffer(askInfo:ASK_INFO){
    this.askInfoService.getAskInfoById(askInfo.id).subscribe(res=>{
      const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
      this.shownAskInfo=response.data;
      console.log(this.shownAskInfo)


    })
  }

}
