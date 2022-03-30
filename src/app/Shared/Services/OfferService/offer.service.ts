import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offerRoute = environment.apiUrl + "offers/"
  constructor(private http: HttpClient) { }


  updateRepresentative(id: string, offer: OFFER): Observable<any> {
    return this.http.put(this.offerRoute + id, offer);


  }

  createOffer(offer: OFFER): Observable<any> {
    return this.http.post(this.offerRoute, offer);
  }


  addSpecification(id: string, data: FormData) :Observable<any> {
    return this.http.post(this.offerRoute + 'files?tenderId=' + id, data);
   }


  getRepresentatives() {
    return this.http.get(this.offerRoute);
  }
}
