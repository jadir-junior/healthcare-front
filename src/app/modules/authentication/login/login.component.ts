import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../scss/authentication.scss'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rememberMe: [{ value: true, disabled: false }],
  })
  isVisiblePassword = false

  constructor(private fb: FormBuilder) {}

  onSubmit({ value }: FormGroup) {
    console.log(value)
  }

  toggleVisible() {
    this.isVisiblePassword = !this.isVisiblePassword
  }
}
