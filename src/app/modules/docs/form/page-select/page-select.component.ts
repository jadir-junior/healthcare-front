import { Component } from '@angular/core'

interface ICity {
  name: string
  code: string
}

@Component({
  selector: 'app-page-select',
  template: `
    <hc-card>
      <hc-select
        placeholder="Select city"
        optionLabel="name"
        [options]="cities"
        [showClear]="true"
        [style]="{ width: '256px' }"
        [(ngModel)]="selectedCity"
      ></hc-select>
      <button (click)="onShow()">show</button>
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
