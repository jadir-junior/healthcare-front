import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `<div class="wrapper-home">
    <hc-sidebar> Dashboard </hc-sidebar>
    <div>Teste</div>
  </div>`,
  styles: [
    `
      .wrapper-home {
        height: 100%;
        display: flex;
      }
    `,
  ],
})
export class HomeComponent {}
