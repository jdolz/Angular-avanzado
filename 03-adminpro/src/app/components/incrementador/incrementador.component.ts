import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progress: number;

  constructor() {
    this.progress = 0;
  }

  ngOnInit(): void {
  }



  cambiarValor(valor: number) {
    if (this.progress <= 0 && valor < 0) this.progress == 0;
    else if (this.progress >= 100 && valor > 0) this.progress == 100;
    else this.progress += valor;
  }

}
