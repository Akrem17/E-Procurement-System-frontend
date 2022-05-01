import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AuthService } from '../Shared/Services/auth.service';
import { UserService } from '../Shared/Services/UserService/user.service';
import { SignalRService } from '../services/signal-r.service';
import { RESPONSE } from '../Shared/Models/RESPONSE';
import { NotificationService } from '../Shared/Services/NotificationService/notification.service';
import { NOTIFICATION } from '../Shared/Models/NOTIFICATION';
import { environment } from 'src/environments/environment';
import { Models } from '../endpoints';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginStatus$: Observable<boolean>;
  email$: Observable<string>;
  type$: Observable<string>;
  userId: string;
  date!: string;
  notificationsCount: number = 0;
  private _hubConnection: HubConnection | undefined;
  messages: NOTIFICATION[] = [];
  constructor(private notificationService: NotificationService, private _authService: AuthService, private _userService: UserService, public signalRService: SignalRService, private http: HttpClient, private auth: AuthService, private user: UserService) { }



  ngOnInit(): void {
    this.generateDateForTheApp();
    this.loginStatus$ = this._authService.isUserLoggedIn;
    this.type$ = this._authService.type;
    this.email$ = this._authService.email;
    this.email$.subscribe(resEmail => {
      this._userService.FilterUserBy(resEmail).subscribe(res => {
        this.userId = res.data[0].id;
        this.notificationService.getNotificationsByDestination(this.userId).subscribe(res => {
          this.messages = [];
          const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
          this.messages=response.data;
          this._hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(environment.socketUrl + Models.socketURI, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets })
            .configureLogging(signalR.LogLevel.Information)
            .build();

          this._hubConnection.start().then(() => {
            console.log("connnntected to socket")
            this._authService.type.subscribe(res=>{
              console.log(res)
              if (res=="institute"){
                this._hubConnection.invoke("joinInstituteNotificationCenter");

              }
            })

          }).catch(err => console.error(err.toString()));


          this._hubConnection.on('Send', (data: NOTIFICATION) => {
            console.log(data)
            this.user.getUserById(data.instituteId.toString()).subscribe(res => {
              const response: RESPONSE = { status: res.status, message: res.message, data: res.data };

              if (response.data.email == resEmail) {
                this.messages.unshift(data)
                this.notificationsCount++;

              }
            });
          })
        })
      })
    })
  }




  logout() {
    this._authService.logout();
  }

  toggle() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav padding20") {
      x.className += " responsive padding20";
    } else {
      x.className = "topnav padding20";
    }
  }

  dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  formatDate(dateObj: Date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    return this.dateOrdinal(dateObj.getDate()) + ', ' + days[dateObj.getDay()] + ' ' + months[dateObj.getMonth()] + ', ' + dateObj.getFullYear();
  }
  dateOrdinal(dom) {
    if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
    else if (dom == 22 || dom == 2) return dom + "nd";
    else if (dom == 23 || dom == 3) return dom + "rd";
    else return dom + "th";
  };


  generateDateForTheApp() {
    let date = new Date();
    this.date = this.formatDate(date)

  }
  RemoveNotification(){
    this.notificationsCount=0
  }


}



