import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(console.log);
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hey');
    //   } else {
    //     reject('Algo fue mal');
    //   }
    // })
    //   .then((mensaje) => {
    //     console.log(mensaje);
    //   }).catch(err => {
    //     console.log(`La verdad es que ${err}`);
    //   });

    // console.log('Wow');

  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data));
    });
  }

}
