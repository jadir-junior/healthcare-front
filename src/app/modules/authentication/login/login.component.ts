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
  submitted = false

  constructor(private fb: FormBuilder) {}

  toggleVisible() {
    this.isVisiblePassword = !this.isVisiblePassword
  }

  onSubmit({ value, valid }: FormGroup) {
    this.submitted = true
    if (valid) {
      console.log(value)
    }
  }
}
