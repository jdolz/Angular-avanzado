import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private userService: UserService,
    private router: Router) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }

  search(value: string): void {
    if (value.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/searches/${value}`);

  }

}
