import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces/user.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateToken() : Observable<boolean>{
    const token = sessionStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, { headers: { 'Authorization': token } })
      .pipe(
        tap((resp: any) => {
          sessionStorage.setItem('token', resp.Authorization);
        }),
        map(resp => true),
        catchError(err => of(false))
      );
  }

  loginUser(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          sessionStorage.setItem('token', resp.Authorization);
        })
      );
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          sessionStorage.setItem('token', resp.Authorization);
        })
      );
  }

  creteUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/user/new`, formData)
      .pipe(
        tap((resp: any) => {
          sessionStorage.setItem('token', resp.Authorization);
        })
      );
  }
}

// fetch o http client
