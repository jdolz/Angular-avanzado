import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: 'user' | 'hospitals' | 'doctor'): string {

    if (!img) {
      return `${base_url}/upload/${type}/no-img.jpg`;
    }

    if (img.includes('https')) {
      return img;
    }
    if (img) {
      return `${base_url}/upload/${type}/${img}`;
    } else {
      return `${base_url}/upload/${type}/no-img.jpg`;
    }
  }

}
