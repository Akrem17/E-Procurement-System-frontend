import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Models } from 'src/app/endpoints';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpecificationService {

  constructor(private http: HttpClient) { }

  private specificationURL: string = environment.apiUrl+Models.Specifications

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
  getFileHeader(file: File): Promise<string> {
    return new Promise(resolve => {
      const headerBytes = file.slice(0, 4); // Read the first 4 bytes of the file
      const fileReader = new FileReader();
      fileReader.onloadend = (e: ProgressEvent<FileReader>) => {
        const arr = new Uint8Array(e?.target?.result as ArrayBufferLike).subarray(
          0,
          4,
        );
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        resolve(header);
      };
      fileReader.readAsArrayBuffer(headerBytes);
    });
  };
  niceBytes(x){
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
     let l = 0, n = parseInt(x, 10) || 0;
     while(n >= 1024 && ++l){
         n = n/1024;
     }
     return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
   }
}
