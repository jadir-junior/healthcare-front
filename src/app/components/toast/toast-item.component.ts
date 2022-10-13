import { Component, Input } from '@angular/core'

import { IMessage } from './message.service'

@Component({
  selector: 'hc-toast-item',
  template: `
    <div [ngClass]="classes">
      <div
        class="hc-toast-message-content"
        role="alert"
        aria-live="assertive"
        aric-atomic="true"
      >
        <span class="hc-toast-message-icon material-symbols-outlined">info</span>
        <div class="hc-toast-message-text">
          <div class="hc-toast-detail subtitle2">{{ message?.detail }}</div>
        </div>
        <button
          type="button"
          class="hc-toast-icon-close"
          *ngIf="message?.closable !== false"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['toast.component.scss'],
})
export class ToastItemComponent {
  @Input() message?: IMessage

  get classes() {
    return {
      [`hc-toast-message-${this.message?.severity}`]: true,
      'hc-toast-message': true,
    }
  }
}
