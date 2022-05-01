import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public hubConnection: signalR.HubConnection


  startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7260/toastr', {
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets
      })
      .build();
  
      this.hubConnection
      .start()
      .then(() => {
          console.log('Hub Connection Started!');
          this.hubConnection.invoke("joinCallCenters");
      })
      .catch(err => console.log('Error while starting connection: ' + err))
  }


  askServerListener() {
      this.hubConnection.on("askServerResponse", (someText) => {
          console.log(someText);
      })
  
}
}
