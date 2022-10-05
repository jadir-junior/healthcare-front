import { FormBuilder, FormGroup } from '@angular/forms'

import { Component } from '@angular/core'

interface ICity {
  name: string
  code: string
}

@Component({
  selector: 'app-page-select',
  template: `
    <hc-card>
      <div>
        <h6 style="margin-bottom: 1rem;">Empty</h6>
        <hc-select
          optionLabel="name"
          [options]="cities"
          [showClear]="true"
          [style]="{ width: '256px' }"
          [(ngModel)]="selectedCity"
        ></hc-select>
      </div>
      <div style="margin-top: 1.5rem">
        <h6 style="margin-bottom: 1rem">Placeholder</h6>
        <hc-select
          placeholder="Select city"
          optionLabel="name"
          [options]="cities"
          [showClear]="true"
          [style]="{ width: '256px' }"
          [(ngModel)]="selectedCity"
        ></hc-select>
      </div>
      <div style="margin-top: 1.5rem;">
        <h6 style="margin-bottom: 1rem;">Disabled</h6>
        <hc-select
          placeholder="Select"
          optionLabel="name"
          [disabled]="true"
          [options]="cities"
          [showClear]="true"
          [style]="{ width: '256px' }"
          [(ngModel)]="selectedCity"
        ></hc-select>
      </div>
      <div style="margin-top: 1.5rem;">
        <h6 style="margin-bottom: 1rem;">ngModel Initial Value</h6>
        <hc-select
          placeholder="Select"
          optionLabel="name"
          [options]="cities"
          [showClear]="true"
          [style]="{ width: '256px' }"
          [(ngModel)]="selectedInitialValue"
        ></hc-select>
      </div>
      <div style="margin-top: 1.5rem;">
        <h6 style="margin-bottom: 1rem;">formControlName Initial Value</h6>
        <form [formGroup]="form" (submit)="onShow()">
          <hc-select
            placeholder="Select"
            optionLabel="name"
            formControlName="city"
            [options]="cities"
            [showClear]="true"
            [style]="{ width: '256px' }"
          ></hc-select>
        </form>
      </div>
    </hc-card>
  `,
  styles: [],
})
export class PageSelectComponent {
  cities: ICity[]
  selectedCity!: ICity
  selectedInitialValue = { name: 'São Paulo', code: 'SP' }
  form: FormGroup = this.fb.group({
    city: [{ name: 'São Paulo', code: 'SP' }],
  })

  constructor(private fb: FormBuilder) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'EDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
      { name: 'San Francisco', code: 'SF' },
      { name: 'São Paulo', code: 'SP' },
      { name: 'Ceara', code: 'CE' },
      { name: 'Minas Gerais', code: 'MG' },
    ]
  }

  onShow() {
    console.log(this.selectedInitialValue)
    console.log(this.form.value)
  }
}
