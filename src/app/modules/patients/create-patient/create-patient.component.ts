import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Component } from '@angular/core'
import { PatientsService } from '../patients.service'

@Component({
  selector: 'app-create-patient',
  template: `
    <form [formGroup]="form" (submit)="onSubmit(form)">
      <hc-input
        formControlName="name"
        placeholder="Name"
        [submitted]="submitted"
      ></hc-input>
      <hc-input
        formControlName="email"
        placeholder="Email"
        type="email"
        [submitted]="submitted"
      ></hc-input>
      <hc-input
        formControlName="phone"
        placeholder="Phone"
        type="tel"
        [submitted]="submitted"
      ></hc-input>
      <hc-input
        formControlName="age"
        placeholder="Age"
        type="number"
        [submitted]="submitted"
      ></hc-input>
      <hc-input
        formControlName="status"
        placeholder="Status"
        [submitted]="submitted"
      ></hc-input>
      <hc-input
        formControlName="address"
        placeholder="Address"
        [submitted]="submitted"
      ></hc-input>
      <hc-button type="submit" ariaLabel="submit" theme="contained" color="primary">
        Create patient
      </hc-button>
    </form>
  `,
  styles: [],
})
export class CreatePatientComponent {
  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    age: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    status: ['', [Validators.required]],
  })
  submitted = false

  constructor(private fb: FormBuilder, private patientsService: PatientsService) {}

  onSubmit({ value, valid }: FormGroup) {
    this.submitted = true
    if (valid) {
      this.patientsService.create(value).subscribe((response) => {
        console.log(response)
        this.submitted = false
        this.form.patchValue({
          name: '',
          email: '',
          age: '',
          address: '',
          phone: '',
          status: '',
        })
        // this.form.updateValueAndValidity()
      })
    }
  }
}
