import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AuthService } from '../Shared/Services/auth.service';
import { UserService } from '../Shared/Services/UserService/user.service';
import { SignalRService } from '../services/signal-r.service';
import { RESPONSE } from '../Shared/Models/RESPONSE';


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

  constructor(private _authService: AuthService, private _userService: UserService,public signalRService: SignalRService, private http: HttpClient,private auth:AuthService,private user:UserService) { }
  private _hubConnection: HubConnection | undefined;
  public async: any;
    message = '';
    messages: string[] = ["wiou"];
 
  ngOnInit(): void {
    let date = new Date();
    this.date = this.formatDate(date)

    this.loginStatus$ = this._authService.isUserLoggedIn;
    this.type$ = this._authService.type;
    this.email$ = this._authService.email;
    this.email$.subscribe(res => {
      this._userService.FilterUserBy(res).subscribe(res => {
        this.userId = res.data[0].id;
      })
    })
    this._hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7260/toastr',{ 
        skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets})
    .configureLogging(signalR.LogLevel.Information)
    .build();

this._hubConnection.start().then(()=>{
  console.log("connnntectedf")

}).catch(err => console.error(err.toString()));
  


this._hubConnection.on('Send', (data: any) => {
  console.log(data)
  this.user.getUserById(data.from).subscribe(res=>{
    const response: RESPONSE = { status: res.status, message: res.message, data: res.data };
    this.auth.email.subscribe(res=>{
      if (response.data.email == res){
        console.log("this") 
        this.message="offer added"
        this.messages.push("Offer added from "+response.data.name)
      }else{
        console.log("not this")

      }
    })
 
 

 console.log(data)
});

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

}



