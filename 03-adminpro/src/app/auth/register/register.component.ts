import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  });

  constructor(private fb: FormBuilder) { }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

  }

  checkInput(input: string): boolean {
    return this.registerForm.get(input).invalid && this.formSubmitted ? true : false;
  }
}
