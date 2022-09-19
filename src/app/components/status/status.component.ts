import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'hc-status',
  template: `
    <div
      class="status"
      [ngClass]="{
        'status-paid': status === 'PAID',
        'status-scheduled': status === 'SCHEDULED',
        'status-unpaid': status === 'UNPAID'
      }"
    >
      <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 8px">
        {{ icon }}
      </span>
      <span>{{ status | titlecase }}</span>
    </div>
  `,
  styles: [
    `
      .status {
        padding: 6px 16px;
        border: 1px solid var(--neutral-gray);
        width: 142px;
        border-radius: 16px;
        text-align: center;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .status-paid {
        border-color: var(--green-default);
        color: var(--green-default);
      }

      .status-scheduled {
        border-color: var(--neutral-gray-dark);
        color: var(--neutral-gray-dark);
      }

      .status-unpaid {
        border-color: var(--red-default);
        color: var(--red-default);
      }
    `,
  ],
})
export class StatusComponent implements OnInit {
  @Input() status!: 'PAID' | 'SCHEDULED' | 'UNPAID'
  icon?: string

  createIcon(): string | undefined {
    switch (this.status) {
      case 'PAID':
        return 'check_circle'
      case 'SCHEDULED':
        return 'history'
      case 'UNPAID':
        return 'cancel'
      default:
        return undefined
    }
  }

  ngOnInit(): void {
    this.icon = this.createIcon()
  }
}
