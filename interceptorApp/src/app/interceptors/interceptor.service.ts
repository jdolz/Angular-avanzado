import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }



  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

    const LANGUAGE_IN_USE: string = window.navigator.language;
    const CURRENT_USER_token: string = 'ASDF4568767867578';


    const headers = new HttpHeaders(
      {
        'Accept-Language': LANGUAGE_IN_USE,
        'Authorization': `Bearer ${CURRENT_USER_token}`
      }
    );

    const reqClone = req.clone({
      headers
    });

    console.log('Through interceptor');
    return next.handle(reqClone).pipe(
      catchError(this.manejarError)
    );
  }

  manejarError(err: HttpErrorResponse) {
    console.error('Sucedió un error');
    console.warn(err);
    return throwError('Error personalizado');
  }
}
