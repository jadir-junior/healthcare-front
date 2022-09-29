import { Component, Input } from '@angular/core'

import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-tag',
  template: `
    <span class="small2" role="tag" [ngClass]="classes" [style]="style">
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      .hc-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: var(--neutral-white);
        padding: 4px 10px;
        border-radius: 6px;
      }

      .hc-tag-primary {
        background-color: var(--primary-default);
      }

      .hc-tag-success {
        background-color: var(--green-default);
      }

      .hc-tag-info {
        background-color: var(--primary-default);
      }

      .hc-tag-warning {
        background-color: var(--yellow-default);
      }

      .hc-tag-danger {
        background-color: var(--red-default);
      }

      .hc-tag-rounded {
        border-radius: 10rem;
      }
    `,
  ],
})
export class TagComponent {
  @Input() severity: 'success' | 'info' | 'warning' | 'danger' | 'primary' = 'primary'
  @Input() style?: IStyle
  @Input() rounded = false

  get classes() {
    return {
      ['hc-tag']: true,
      [`hc-tag-${this.severity}`]: true,
      ['hc-tag-rounded']: this.rounded,
    }
  }
}
