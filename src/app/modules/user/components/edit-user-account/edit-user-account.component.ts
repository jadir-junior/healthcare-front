import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

import { IProfile } from '../../services/user.service'
import { createMask } from '@ngneat/input-mask'

@Component({
  selector: 'hc-edit-user-account',
  template: `
    <hc-card>
      <form [formGroup]="form" (submit)="onSubmit(form)">
        <div class="hc-form-control">
          <hc-input
            formControlName="name"
            id="name"
            label="Name"
            [submitted]="submitted"
          ></hc-input>
        </div>
        <div class="hc-form-control hc-form-two-input">
          <div>
            <hc-input
              type="number"
              formControlName="age"
              id="age"
              label="Age"
              [submitted]="submitted"
            ></hc-input>
          </div>
          <div>
            <hc-select
              [options]="genders"
              formControlName="gender"
              id="gender"
              labelTitle="Gender"
              optionLabel="description"
            ></hc-select>
          </div>
        </div>
        <div class="form-control">
          <hc-input
            type="tel"
            formControlName="phone"
            id="phone"
            label="Phone number"
            [submitted]="submitted"
            [inputMask]="phoneMask"
          ></hc-input>
        </div>
        <div class="form-control">
          <hc-input
            formControlName="lastVisit"
            id="lastVisit"
            label="Last visit"
          ></hc-input>
        </div>
        <div class="form-control">
          <hc-select
            [options]="status"
            formControlName="status"
            id="status"
            labelTitle="Status"
            optionLabel="description"
          ></hc-select>
        </div>
        <div class="hc-form-button">
          <hc-button color="primary" type="submit">Save changes</hc-button>
        </div>
      </form>
    </hc-card>
  `,
  styles: [
    `
      .hc-form-two-input {
        display: flex;

        div {
          flex: 1;
        }

        div:first-child {
          margin-right: 1rem;
        }
      }

      .hc-form-button {
        display: flex;
        justify-content: flex-end;
        padding-top: 1rem;
      }
    `,
  ],
})
export class EditUserAccountComponent implements OnInit {
  @Input() user!: IProfile

  @Output() onEditUser = new EventEmitter()

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    lastVisit: [{ value: '', disabled: true }],
    status: ['', [Validators.required]],
  })
  genders = [
    { code: 'FEMALE', description: 'Female' },
    { code: 'MALE', description: 'Male' },
  ]
  status = [
    { code: 'APPROVED', description: 'Approved ' },
    { code: 'PENDING', description: 'Pending' },
  ]
  submitted = false

  phoneMask = createMask('(99) 9999-9999[9]')

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        name: this.user.name,
        age: this.user.age,
        gender: this.genders.find((g) => g.code === this.user.gender),
        phone: this.user.contact.phone,
        lastVisit: this.user.history[this.user.history.length - 1].lastVisit,
        status: this.status.find((f) => f.code === this.user.status),
      })
    }
  }

  get phone() {
    return this.form.get('phone') as FormControl
  }

  onSubmit({ value, valid }: FormGroup): void {
    this.submitted = true
    if (valid) {
      this.onEditUser.emit(value)
    }
  }
}
