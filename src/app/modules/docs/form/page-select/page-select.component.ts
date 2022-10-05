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
    </hc-card>
  `,
  styles: [],
})
export class PageSelectComponent {
  cities: ICity[]
  selectedCity!: ICity

  constructor() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'EDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ]
  }

  onShow() {
    console.log(this.selectedCity)
  }
}
