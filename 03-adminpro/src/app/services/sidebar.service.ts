import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  constructor() {
  }

  getMenu() {
    this.menu = JSON.parse(sessionStorage.getItem('menu'));
  }
}
