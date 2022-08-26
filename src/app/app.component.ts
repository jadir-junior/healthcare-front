import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `<div class="container"><router-outlet></router-outlet></div>`,
  styles: [
    `
      .container {
        background-color: var(--neutral-background);
      }
    `,
  ],
})
export class AppComponent {}
