import { Component, Input } from '@angular/core'

import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-icon',
  template: `
    <div [ngClass]="classes" class="material-symbols-outlined hc-icon" [ngStyle]="style">
      {{ icon }}
    </div>
  `,
  styles: [
    `
      .hc-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

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
  @Input() style?: IStyle

  public get classes() {
    return {
      [`icon-size-${this.size}`]: true,
    }
  }
}
