import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  onSubmit({ value }: FormGroup) {
    console.log(value)
  }
}
