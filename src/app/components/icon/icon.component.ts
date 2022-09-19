import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-icon',
  template: `
    <div [ngClass]="classes" class="material-symbols-outlined">
      {{ icon }}
    </div>
  `,
  styles: [
    `
      .icon-size-small {
        font-size: 16px;
      }

      .icon-size-normal {
        font-size: 20px;
      }

      .icon-size-large {
        font-size: 24px;
      }
    `,
  ],
})
export class IconComponent {
  @Input() icon!: string
  @Input() size: 'small' | 'normal' | 'large' = 'normal'

  public get classes() {
    return {
      [`icon-size-${this.size}`]: true,
    }
  }
}
