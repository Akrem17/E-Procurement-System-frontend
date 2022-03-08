import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SUPPLIER } from '../../Models/SUPPLIER';
import { SUPPLIER_FILTERS } from '../../Models/SUPPLIER_FILTERS';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private supplierRoute=environment.apiUrl+"suppliers/" 

  constructor(private http:HttpClient) { }

  getSupplier(){
    return this.http.get(this.supplierRoute);
  }

  getSupplierById(id:string){
    return this.http.get(this.supplierRoute+id);
  }
  updateSupplier(id:string,institute:SUPPLIER){
    return this.http.put(this.supplierRoute+id,institute);
  }
  deleteSupplier(id:string){
    return this.http.delete(this.supplierRoute+id);
  }

    
  FilterInstituteBy(filters:SUPPLIER_FILTERS ){
    let filter="";
    Object.entries(filters).forEach(res=>{
      filter+="&"+res[0]+"="+res[1];
   
    }); 
    return this.http.get(this.supplierRoute+"?"+filter);

  }

  
}
