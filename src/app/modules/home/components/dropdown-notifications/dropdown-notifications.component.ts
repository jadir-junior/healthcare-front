import { Component, Input } from '@angular/core'

export interface IItemNotification {
  title: string
  description: string
  icon: string
  color: string
  timeAgo: string
}

@Component({
  selector: 'hc-dropdown-notifications',
  template: `
    <div>
      <header class="hc-notifications-header">
        <h6>Notifications</h6>
        <p class="small2">{{ reports }} notifications</p>
      </header>
      <div>
        <div class="hc-notification-item" *ngFor="let notification of notifications">
          <div class="hc-wrapper-icon-and-description">
            <hc-icon
              [icon]="notification.icon"
              size="large"
              theme="contained"
              [color]="notification.color"
            ></hc-icon>
            <div class="hc-notication-title-and-description">
              <div class="subtitle1 hc-notification-title">{{ notification.title }}</div>
              <div class="small2 hc-notification-description">
                {{ notification.description }}
              </div>
            </div>
          </div>
          <div>
            <div class="hc-notification-badge small2">{{ notification.timeAgo }}</div>
          </div>
        </div>
      </div>
      <footer class="hc-notification-footer">
        <hc-button theme="text" color="primary">View all</hc-button>
      </footer>
    </div>
  `,
  styles: [
    `
      .hc-notifications-header {
        background: linear-gradient(90deg, var(--primary-dark), var(--primary-default));
        color: var(--neutral-white);
        padding: 1.5rem;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        display: flex;
        align-items: flex-end;

        p {
          margin-left: 0.5rem;
          line-height: 18px;
        }
      }

      .hc-notification-item {
        padding: 0.75rem 1.5rem 0.75rem 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:first-child {
          padding-top: 1.5rem;
        }

        &:last-child {
          padding-bottom: 1.5rem;
        }
      }

      .hc-wrapper-icon-and-description {
        display: flex;
        align-items: center;
      }

      .hc-notication-title-and-description {
        margin-left: 0.5rem;
      }

      .hc-notification-description {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 200px;
        color: var(--neutral-gray);
      }

      .hc-notification-badge {
        color: var(--neutral-gray-dark);
        background-color: var(--neutral-divider);
        padding: 4px 8px;
        border-radius: 4px;
      }

      .hc-notification-title {
        cursor: pointer;

        &:hover {
          color: var(--primary-default);
        }
      }

      .hc-notification-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-top: 1px solid var(--neutral-divider);
      }
    `,
  ],
})
export class DropdownNotificationsComponent {
  @Input() reports!: number
  @Input() notifications!: IItemNotification[]
}
