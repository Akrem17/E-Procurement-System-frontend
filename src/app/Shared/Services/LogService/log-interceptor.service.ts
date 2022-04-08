import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogInterceptorService implements HttpInterceptor{


  constructor(private route:Router) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      return next.handle(request)
          .pipe(
              map(res => {
                  return res
              }),
              catchError((error: HttpErrorResponse) => {
                  let errorMsg = '';
                  if (error.error instanceof ErrorEvent) {
                      console.log('This is client side error');
                      errorMsg = `Error: ${error.error.message}`;
                  } else {
                      console.log('This is server side error');
                      errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                  }
                  Swal.fire(
                    'Error',
                    errorMsg,
                    'error'
                  ).then(()=>{
                    //this.route.navigate(['/error']);

                  })

                  return throwError(errorMsg);
              })
          )
  }
  
  private modifyBody(body: any) {
    /*
    * write your logic to modify the body
    * */
}
}
