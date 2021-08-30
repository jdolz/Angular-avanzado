import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios() {

    let params = new HttpParams().append('page', '1');
    params = params.append('nombre', 'Loquete');



    return this.http.get('https://reqres.in/api/users')
      .pipe(
        //   filter(event => event instanceof ActivationEnd && event.snapshot.firstChild === null),
        // map((event: ActivationEnd) => event.snapshot.data));
        map(resp => resp['data'])
      )
  }

  
}
