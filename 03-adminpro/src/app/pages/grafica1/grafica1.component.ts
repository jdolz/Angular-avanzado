import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  labels1: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  data1 = [ [350, 450, 100] ];

  labels2: string[] = ['Download Buys', 'In-Store Buys', 'Mail-Order Buys'];
  data2 = [ [340, 400, 150] ];


  constructor() { }

  ngOnInit(): void {
  }

}
