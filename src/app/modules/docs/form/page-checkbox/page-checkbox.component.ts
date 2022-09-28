import { Component } from '@angular/core'

@Component({
  selector: 'app-page-checkbox',
  template: `
    <hc-card>
      <div class="wrapper-checkbox">
        <hc-checkbox
          label="New York"
          name="group1"
          value="New York"
          [(ngModel)]="selectedCities"
          id="ny"
        >
        </hc-checkbox>
      </div>
      <div class="wrapper-checkbox">
        <hc-checkbox
          label="San Francisco"
          name="group1"
          value="San Francisco"
          [(ngModel)]="selectedCities"
          id="sf"
        >
        </hc-checkbox>
      </div>
      <div class="wrapper-checkbox">
        <hc-checkbox
          label="Los Angeles"
          name="group1"
          value="Los Angeles"
          [(ngModel)]="selectedCities"
          id="la"
        >
        </hc-checkbox>
      </div>
      <div class="wrapper-checkbox">
        <hc-checkbox
          label="Chicago"
          name="group1"
          value="Chicago"
          [(ngModel)]="selectedCities"
          [disabled]="true"
          id="ch"
        >
        </hc-checkbox>
      </div>
      <div class="wrapper-checkbox">
        <hc-checkbox
          label="Terms"
          [binary]="true"
          [(ngModel)]="terms"
          id="terms"
        ></hc-checkbox>
      </div>
    </hc-card>
  `,
  styles: [
    `
      .wrapper-checkbox {
        margin: 0.5rem 0;
      }
    `,
  ],
})
export class PageCheckboxComponent {
  selectedCities: string[] = []
  terms = false
}
