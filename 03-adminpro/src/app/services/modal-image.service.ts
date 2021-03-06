import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  type: 'user' | 'doctor' | 'hospital';
  id: string;
  img: string;

  imgChanged: EventEmitter<string> = new EventEmitter();

  get hideModal(): boolean {
    return this._hideModal;
  }

  openModal(type: 'user' | 'doctor' | 'hospital', id: string, img: string = 'no-img.jpg') {
    this._hideModal = false;
    this.type = type;
    this.id = id;
    
    if(img.includes('https')){
      this.img = img;
    }else{
      this.img = `${base_url}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }

  constructor() { }
}
