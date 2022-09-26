import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-badge',
  template: ` <span [ngClass]="classes" *ngIf="value">{{ value }}</span> `,
  styleUrls: ['badge.component.scss'],
})
export class BadgeComponent {
  @Input() value?: string | number
  @Input() severity = 'danger'

  get classes() {
    return {
      ['hc-badge']: true,
      [`hc-badge-${this.severity}`]: !!this.severity,
      ['hc-badge-no-gutter']: this.value != undefined && String(this.value).length === 1,
    }
  }
}
