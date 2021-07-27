import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';
import { UserService } from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FindService {

  token: string;
  user: User;

  constructor(private userService: UserService) {
    this.token = userService.token;
  }

  private mapUsers(arr: any[]): User[] {
    return arr.map(user => new User(user.name, user.email, '', user.img, user.role, user.google, user.uid));
  }

  private mapHospitals(arr: any[]): Hospital[] {
    return arr;
  }

  async find(table: 'user' | 'hospital' | 'doctor', name: string) {
    try {

      const url = `${base_url}/find/concrete/${table}/${name}`;

      const resp = await fetch(url, { method: 'GET', headers: { 'Authorization': this.token } });

      const data = await resp.json();

      const CASES = {
        'user': this.mapUsers(data.result),
        'hospital': this.mapHospitals(data.result),
        'doctor': []
      };

      data.result = CASES[table] ? CASES[table] : undefined;

      return data;

    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
