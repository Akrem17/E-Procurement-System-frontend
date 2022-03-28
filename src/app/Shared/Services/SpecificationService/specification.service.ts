import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

  constructor(private http: HttpClient) { }

  private specificationURL: string = "https://localhost:7260/api/FileManager/"

  addSpecification(id: string, data: FormData) :Observable<any> {
   return this.http.post(this.specificationURL + '?tenderId=' + id, data);
  }

  getSpecifications(id:string): Observable<any>{

    return this.http.get(this.specificationURL+id);
  }


  downloadSpecification(id: string)  {
 
   return this.http.get(this.specificationURL+'download/'+id, {responseType: "blob", headers: {'Accept': 'application/pdf'}});
  }
  
  deleteSpecification(id:string): Observable<any>{
    return this.http.delete(this.specificationURL+id);

  }
}
