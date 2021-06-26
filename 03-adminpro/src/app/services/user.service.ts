import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginForm, ProfileForm, RegisterForm } from '../interfaces/user.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

declare const gapi: any;
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth2: any;
  user: User;

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

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  logout() {
    sessionStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      console.log('User signed out');
    });
  }

  validateToken(): Observable<boolean> {
    
    return this.http.get(`${base_url}/login/renew`, { headers: { 'Authorization': this.token } })
      .pipe(
        map((resp: any) => {
          sessionStorage.setItem('token', resp.Authorization);
          const { email, google, img = '', name, password, role, uid } = resp.user;
          this.user = new User(name, email, password, img, role, google, uid);
          return true;
        }),
        catchError(err => {
          console.log(err);
          return of(false);
        })
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

  // tap no transforma la response, map sí y tiene un return

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

  updateProfile(formData?: ProfileForm, data?: { email: string, name: string }) {
    
    const body = { role: this.user.role, ...(formData || data) };

    return this.http.put(`${base_url}/user/update/${this.user.uid}`, body, { headers: { 'Authorization': this.token } });
    
  }

  

}

// fetch o http client
