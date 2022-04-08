import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';
import { LICENCE } from '../../Models/LICENCE';

@Injectable({
  providedIn: 'root'
})
export class LicenceService {
  private licenceRoute=environment.apiUrl+Models.licence

  constructor(private http:HttpClient) { }
  updateLicence(id:string,licence:LICENCE):Observable<any>{
    return this.http.put(this.licenceRoute+id,licence);
  }
}
