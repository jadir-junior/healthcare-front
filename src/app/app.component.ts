import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <div style="position: absolute; top: 10px; right: 10px;">
      <hc-msw></hc-msw>
    </div>
    <router-outlet></router-outlet>
  </div>`,
  styles: [
    `
      .container {
        background-color: var(--neutral-background);
        position: relative;
      }
    `,
  ],
})
export class AppComponent {}
