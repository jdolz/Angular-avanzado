import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  imgUpload: File;
  imgTemp: any = null;


  constructor(public modalImageService: ModalImageService,
    private fileUploadService: FileUploadService) { }

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

  uploadImage() {
    this.fileUploadService.updateImage(this.imgUpload, this.modalImageService.type, this.modalImageService.id).then((resp) => {
      if (resp.ok) {
        Swal.fire('Saved', 'Image updated', 'success');
        this.modalImageService.imgChanged.emit(this.modalImageService.img);
        this.closeModal();
      } else {
        Swal.fire('Error', resp.msg, 'error');
      }

    }).catch((err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

}
