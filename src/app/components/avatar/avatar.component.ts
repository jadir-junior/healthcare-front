import { IStyle } from './../../common/models/style.model'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-avatar',
  template: `
    <div [ngClass]="classes" [style]="style" data-testid="avatar">
      <span *ngIf="label; else iconTemplate">{{ label }}</span>
      <ng-template #iconTemplate>
        <span
          *ngIf="icon; else imageTemplate"
          class="material-symbols-outlined hc-avatar-icon"
        >
          {{ icon }}
        </span>
      </ng-template>
      <ng-template #imageTemplate>
        <img class="hc-avatar-image" *ngIf="image" [src]="image" />
      </ng-template>
    </div>
  `,
  styles: [
    `
      .hc-avatar {
        background-color: var(--neutral-gray-lighter);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        color: var(--neutral-black);
      }

      .hc-avatar-image {
        background-color: transparent;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
      }

      .hc-avatar-circle {
        border-radius: 50%;
        overflow: hidden;
      }

      .hc-avatar-size-small {
        width: 2rem;
        height: 2rem;
        font-size: 1rem;

        .hc-avatar-icon {
          font-size: 1.5rem;
        }
      }

      .hc-avatar-size-medium {
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;

        .hc-avatar-icon {
          font-size: 2rem;
        }
      }

      .hc-avatar-size-large {
        width: 4rem;
        height: 4rem;
        font-size: 2rem;

        .hc-avatar-icon {
          font-size: 2.5rem;
        }
      }
    `,
  ],
})
export class AvatarComponent {
  @Input() label?: string
  @Input() size: 'small' | 'medium' | 'large' = 'medium'
  @Input() style?: IStyle
  @Input() circle = false
  @Input() icon?: string
  @Input() image?: string

  public get classes() {
    return {
      ['hc-avatar']: true,
      [`hc-avatar-size-${this.size}`]: true,
      ['hc-avatar-circle']: this.circle,
    }
  }
}
