import { Component } from '@angular/core'

@Component({
  selector: 'hc-footer-version',
  template: ` <footer class="wrapper-footer">Version:</footer> `,
  styles: [
    `
      .wrapper-footer {
        margin: 1rem 1.5rem;
      }
    `,
  ],
})
export class FooterVersionComponent {}
