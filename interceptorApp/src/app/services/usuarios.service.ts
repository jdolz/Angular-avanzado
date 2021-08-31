import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {

    let params = new HttpParams().append('page', '2');
    params = params.append('name', 'Bluth');

    let headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFmZmM1N2FmMWNlZjJhNDRmZGE3MGQiLCJpYXQiOjE2MjIxNDYxMzUsImV4cCI6MTYyMjE4OTMzNX0.glGdlz-5eQbs3ZfIIThojlt71IweirWZ7sx2p9QpgtE'
    });

    return this.http.get('https://reqres.in/api/users', { params, headers })
      .pipe(
        //   filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
        // map((event: ActivationEnd) => event.snapshot.data));
        map(resp => resp['data']),
        catchError(this.handleError)
      )
  }

  handleError(err: HttpErrorResponse) {
    return throwError('errorPersonalizado');
  }


}
