import { Component, OnInit } from '@angular/core';
import { LoadUsers } from 'src/app/interfaces/user.interface';
import { User } from 'src/app/models/user.model';
import { FindService } from 'src/app/services/find.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  from: number = 0;
  totalUsers: number = 0;
  users: User[] = [];
  usersTemp: User[] = [];
  loading: boolean = true;

  constructor(private userService: UserService, private findService: FindService, private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  openModal(user: User){
    console.log(user);
    
    this.modalImageService.openModal('user', user.uid, user.img);
  }

  changeFrom(value: number) {

    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from >= this.totalUsers) {

      this.from -= value;


    }

    this.loadUsers();

  }

  loadUsers() {

    this.loading = true;

    this.userService.loadUsers(this.from).subscribe((resp: LoadUsers) => {
      this.totalUsers = resp.total;
      this.users = resp.users;
      this.usersTemp = this.users;
      this.loading = false;
    });
  }

  findUsers(value) {
    this.loading = true;

    if (value.length === 0) {
      this.loading = false;
      return this.users = this.usersTemp;
    }

    this.findService.find('user', value).then((resp) => {
      this.users = resp.result;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.user.uid) {
      return Swal.fire('Error', 'Cannot delete your own user', 'error');
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {

          this.loadUsers();
          Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );

        });

      }
    });
  }

  changeRole(user: User) {
    
    this.userService.updateRole(user).subscribe();
    
  }


}
