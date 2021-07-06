import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  hideModal: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.hideModal = true;
  }

}
