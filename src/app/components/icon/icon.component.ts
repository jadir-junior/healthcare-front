import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-icon',
  template: ` <div class="material-symbols-outlined wrapper-icon">{{ icon }}</div> `,
  styles: [
    `
      .wrapper-icon {
        font-size: 20px;
      }
    `,
  ],
})
export class IconComponent {
  @Input() icon!: string
}
