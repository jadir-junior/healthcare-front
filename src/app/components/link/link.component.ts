import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-link',
  template: ` <a [routerLink]="router"><ng-content></ng-content></a> `,
  styles: [
    `
      a {
        font-size: 14px;
        line-height: 14px;
        letter-spacing: 0.2px;
        font-weight: bold;
        color: var(--primary-default);
        cursor: pointer;
        text-decoration: none;
      }
    `,
  ],
})
export class LinkComponent {
  @Input() router!: string
}
