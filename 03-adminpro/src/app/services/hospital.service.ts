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

  loadHospitals() {
    return this.http.get(`${base_url}/hospital/all`, this.headers).pipe(
      map((resp: { ok: boolean, hospitals: Hospital[] }) => resp.hospitals));
  }

  createHospital(name: string) {
    return this.http.post(`${base_url}/hospital/new`, { name }, this.headers);
  }

  updateHospital(_id: string, name: string) {
    return this.http.put(`${base_url}/hospital/update/${_id}`, { name }, this.headers);
  }

  deleteHospital(_id: string) {

    return this.http.delete(`${base_url}/hospital/delete/${_id}`, this.headers);
  }


}
