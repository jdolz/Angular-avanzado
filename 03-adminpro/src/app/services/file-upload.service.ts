
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  token: string;

  constructor(private userService: UserService) {
    this.token = userService.token;
  }

  async updateImage(file: File, type: 'user' | 'hospital' | 'doctor', id: string) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);

      const resp = await fetch(url, { method: 'PUT', headers: { 'Authorization': this.token }, body: formData });

      const data = await resp.json();

      return data;

    } catch (err) {
      console.log(err);
      return false;
    }
  }

}
