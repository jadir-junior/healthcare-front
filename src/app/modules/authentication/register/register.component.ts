import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../scss/authentication.scss'],
})
export class RegisterComponent {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    terms: [true],
  })

  isVisiblePassword = false
  submitted = false

  constructor(private fb: FormBuilder) {}

  toggleVisibilityPassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword
  }

  onSubmit({ value, valid }: FormGroup): void {
    this.submitted = true
    if (valid) {
      console.log(value)
    }
  }
}
