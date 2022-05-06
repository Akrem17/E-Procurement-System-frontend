import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { NOTIFICATION } from '../../Models/NOTIFICATION';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }
  public notificationNumber: BehaviorSubject<number>  = new BehaviorSubject<number>(0);

  private specificationURL: string = environment.apiUrl+Models.notification

  // addNotification( notification: NOTIFICATION) :Observable<any> {
  //  return this.http.post(this.specificationURL, notification);
  // }
  getNotifications():Observable<any>{
    return this.http.get(this.specificationURL);
  }

  getNotificationsByDestination(id:string):Observable<any>{
    return this.http.get(this.specificationURL+"destination/"+id);
  }

  
}
