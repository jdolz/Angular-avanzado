import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'Authorization': this.token } };
  }

  loadhospitals() {
    return this.http.get(`${base_url}/hospital/all`, this.headers).pipe(
      map((resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals));
  }

}
