import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm, RegisterForm } from '../interfaces/user.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth2: any;

  constructor(private http: HttpClient) {
    this.googleInit();
  }

  googleInit() {

    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '114359265375-78v6jf070s6o16lgv7ftv06jc3noc34p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve(this.auth2);
      });
    });

  }

  logout() {
    sessionStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      console.log('User signed out');
    });
  }

  validateToken(): Observable<boolean> {
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
