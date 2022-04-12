import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SignalRService } from './services/signal-r.service';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { UserService } from './Shared/Services/UserService/user.service';
import { AuthService } from './Shared/Services/auth.service';
import { RESPONSE } from './Shared/Models/RESPONSE';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public signalRService: SignalRService, private http: HttpClient,private auth:AuthService,private user:UserService) { }
  private _hubConnection: HubConnection | undefined;
    public async: any;
    message = '';
    messages: string[] = [];
 

    ngOnInit() {
      
       
    }
  }

//   repeat(){
//     let i = 0;
//     let max = 5;
//     if (++i >20) return;
//     setTimeout(()=>{
//       this.signalRService.startConnection();

//       this.signalRService.askServerListener();
//       console.log("waited for: " + i + " seconds");
      
//       this.repeat();
//     }, 1000);
//   };
//   ngOnInit() {


//  this.repeat()


    // this.signalRService.addTransferChartDataListener();   
    // this.startHttpRequest();
  
  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:7260/api/Citizens')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

  // title = 'e-procurement';
  // ngOnDestroy(){
  //   this.signalRService.hubConnection.off("askServerResponse");
  // }

