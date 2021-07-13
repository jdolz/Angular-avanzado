import { Component, OnInit } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {
  imgUpload: File;
  imgTemp: any =  null;


  constructor(public modalImageService: ModalImageService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
  }

  uploadChange(file: File): void {

    this.imgUpload = file;

    if (!file) return this.imgTemp = null;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

}
