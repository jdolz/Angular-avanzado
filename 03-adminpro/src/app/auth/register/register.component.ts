import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

  constructor(private fb: FormBuilder) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm);

    if (this.registerForm.valid) console.log('Posteando');
    else console.log('Formulario con errores');

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
