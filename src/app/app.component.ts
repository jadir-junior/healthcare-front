import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <div
      style="position: absolute; top: 10px; left: 50%; right: 50%; transform: (-50%, -50%);"
    >
      <hc-msw></hc-msw>
    </div>
    <router-outlet></router-outlet>
  </div>`,
  styles: [
    `
      .container {
        background-color: var(--neutral-background);
        position: relative;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {}
