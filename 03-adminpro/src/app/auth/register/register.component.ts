import { Component, OnDestroy } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy{

  newUser$: Subscription;

  formSubmitted = false;
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  }, {
    validators: this.passwordMatch('password', 'password2')
  } as AbstractControlOptions
  );

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router
    ) { }
    
  ngOnDestroy(): void {
    if(this.newUser$) this.newUser$.unsubscribe();
  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.invalid) return console.log('Formulario con errores');

    console.log('Posteando');
    this.newUser$ = this.userService.creteUser(this.registerForm.value).subscribe(data =>{
      this.router.navigateByUrl('/');
    }, err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    
  }

  checkInput(input: string): boolean {
    return this.registerForm.get(input).invalid && this.formSubmitted ? true : false;
  }

  passwordMatch(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      formGroup.controls[pass1].value === formGroup.get(pass2).value ? formGroup.get(pass2).setErrors(null) : formGroup.get(pass2).setErrors({ notEqual: true });
    }
  }

}
