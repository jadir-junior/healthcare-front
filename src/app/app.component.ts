import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `<form [formGroup]="form" (submit)="onSubmit(form)">
    <hc-input formControlName="login" placeholder="Login"></hc-input>
    <button type="submit">Sign in</button>
  </form>`,
})
export class AppComponent {
  form: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder) {}

  onSubmit({ value }: FormGroup) {
    console.log(value)
  }
}
