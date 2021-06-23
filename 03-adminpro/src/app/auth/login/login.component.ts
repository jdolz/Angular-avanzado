import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService, private ngZone: NgZone) { }
  ngOnDestroy(): void {
    if (this.loginUser$) this.loginUser$.unsubscribe();
  }

  auth2: any;
  loginUser$: Subscription;
  loginSubmitted = false;

  loginForm = this.fb.group({
    email: [sessionStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  ngOnInit(): void {
    this.renderButton();
  }

  login() {
    this.loginSubmitted = true;
    console.log(this.loginForm.value);
    console.log(this.loginForm);

    if (this.loginForm.invalid) return console.log('Formulario con errores');
    this.loginUser$ = this.userService.loginUser(this.loginForm.value).subscribe(data => {
      if (this.loginForm.get('remember').value) { sessionStorage.setItem('email', this.loginForm.get('email').value); }
      else { sessionStorage.removeItem('email') };
      this.router.navigateByUrl('/');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });


  }

  checkInput(input: string): boolean {
    return this.loginForm.get(input).invalid && this.loginSubmitted ? true : false;
  }


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {
    this.auth2 = await this.userService.googleInit();

    this.attachSignin(document.getElementById('my-signin2'));
  };


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token).subscribe(
          data => {
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            });
          }
        );

      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
