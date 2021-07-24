import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit, OnDestroy{

  profileForm: FormGroup;
  user: User;
  imgUpload: File;
  imgTemp: any = null;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private userService: UserService, private fileUploadService: FileUploadService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  updateProfile() {

    this.userService.updateProfile(this.profileForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((resp: User) => {
      this.user.name = resp.name;
      this.user.email = resp.email;

      Swal.fire('Saved', 'Changes were saved', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });

  }

  uploadChange(file: File): void {

    this.imgUpload = file;

    if (!file) return this.imgTemp = null;;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  uploadImage() {
    this.fileUploadService.updateImage(this.imgUpload, 'user', this.user.uid).then((resp) => {
      if (resp.ok) {
        this.user.img = resp.fileName;
        Swal.fire('Saved', 'Image updated', 'success');
      } else {
        Swal.fire('Error', resp.msg, 'error');
      }

    }).catch((err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
