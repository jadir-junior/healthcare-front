import { Component, Input, ViewEncapsulation } from '@angular/core'

import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-card',
  template: `
    <div class="hc-card" [ngStyle]="style" [class]="styleClass">
      <div class="hc-card-body">
        <h5 class="hc-card-title" *ngIf="header">
          {{ header }}
        </h5>
        <div class="hc-card-content">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .hc-card {
        background-color: var(--neutral-white);
        width: 100%;
        box-shadow: 0px 12px 26px #101e730f;
        border-radius: 0.5rem;
        color: var(--neutral-black);
      }

      .hc-card-body {
        padding: 1.5rem;
      }

      .hc-card-title {
        margin-bottom: 1rem;
      }

      .hc-card-content {
        padding: 1rem 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() header?: string
  @Input() style?: IStyle
  @Input() styleClass?: string
}
