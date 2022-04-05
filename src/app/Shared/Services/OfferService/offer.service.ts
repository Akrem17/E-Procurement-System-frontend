import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OFFER } from 'src/app/Shared/Models/OFFER';
import { Observable } from 'rxjs';
import { OFFER_FILTERS } from '../../Models/OFFER_FILTERS';
import { Models } from 'src/app/endpoints';
@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private offerRoute = environment.apiUrl + Models.offer
  constructor(private http: HttpClient) { }


  updateOffer(id: string, offer: OFFER): Observable<any> {
    return this.http.put(this.offerRoute + id, offer);


  }

  createOffer(offer: OFFER): Observable<any> {
    return this.http.post(this.offerRoute, offer);
  }

  getSingleOffer(id:string): Observable<any> {
    return this.http.get(this.offerRoute+id);
  }

  addSpecification(id: string, data: FormData) :Observable<any> {
    return this.http.post(this.offerRoute + 'files?tenderId=' + id, data);
   }


  getRepresentatives() {
    return this.http.get(this.offerRoute);
  }

  getOfferBy(skip:number=null,take:number=null,filters:OFFER_FILTERS):Observable<any> {
    let filter="";
    Object.entries(filters)?.forEach(res=>{
      if(res[1]!=null && res[1]!='undifined')
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    console.log(this.offerRoute+"?skip="+skip+"&take="+take+filter)

    return this.http.get(this.offerRoute+"?skip="+skip+"&take="+take+filter);
  }
  deleteOffer(id):Observable<any>{
    return this.http.delete(this.offerRoute+id);


  }
}
