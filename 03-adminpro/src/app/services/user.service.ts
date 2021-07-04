import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoadUsers, LoginForm, ProfileForm, RegisterForm } from '../interfaces/user.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
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

  get headers() {
    return { headers: { 'Authorization': this.token } };
  }

  logout() {
    sessionStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      console.log('User signed out');
    });
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, this.headers)
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

    return this.http.put(`${base_url}/user/update/${this.user.uid}`, body, this.headers);

  }

  updateRole(user: User) {

    const body = { role: user.role, email: user.email, name: user.name };

    return this.http.put(`${base_url}/user/update/${user.uid}`, body, this.headers);

  }

  loadUsers(from: number = 0) {
    return this.http.get<LoadUsers>(`${base_url}/user/all?from=${from}`, this.headers).pipe(
      // delay(1000),
      map(resp => {
        const users = resp.users.map(user =>
          new User(user.name, user.email, '', user.img, user.role, user.google, user.uid));
        resp.users = users;
        return resp;
      })
    )
  }

  deleteUser(user: User) {

    return this.http.delete(`${base_url}/user/delete/${user.uid}`, this.headers);
    
  }
}

// fetch o http client
