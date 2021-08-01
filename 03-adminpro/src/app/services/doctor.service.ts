import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'Authorization': this.token } };
  }

  loadDoctors() {
    return this.http.get(`${base_url}/doctor/all`, this.headers).pipe(
      map((response: { ok: boolean, doctors: Doctor[] }) => response.doctors)
    );
  }

  getDoctorById(_id: string) {
    return this.http.get(`${base_url}/doctor/${_id}`, this.headers).pipe(
      map((response: { ok: boolean, doctor: Doctor }) => response.doctor)
    );
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    return this.http.post(`${base_url}/doctor/new`, doctor, this.headers).pipe(
      map((response: { ok: boolean, msg: string, doctor: Doctor }) => response.doctor)
    );
  }

  updateDoctor(doctor: { _id: string, name: string, hospital: string }) {
    return this.http.put(`${base_url}/doctor/update/${doctor._id}`, doctor, this.headers);
  }

  deleteDoctor(_id: string) {

    return this.http.delete(`${base_url}/doctor/delete/${_id}`, this.headers);
  }
}
