import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { animate, state, style, transition, trigger } from '@angular/animations'

import { IMessage } from './message.service'

export interface IOnClose {
  index: number
  message: IMessage
}

@Component({
  selector: 'hc-toast-item',
  template: `
    <div
      [ngClass]="classes"
      [@messageState]="{
        value: 'visible',
        params: {
          showTransformParams: showTransformOptions,
          showTransitionParams: showTransitionOptions,
          hideTransformParams: hideTransformOptions,
          hideTransitionParams: hideTransitionOptions
        }
      }"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
    >
      <div
        class="hc-toast-message-content"
        role="alert"
        aria-live="assertive"
        aric-atomic="true"
      >
        <span class="hc-toast-message-icon material-symbols-outlined">info</span>
        <div class="hc-toast-message-text">
          <div class="hc-toast-detail subtitle2">{{ message.detail }}</div>
        </div>
        <button
          type="button"
          class="hc-toast-icon-close"
          *ngIf="message.closable !== false"
          (click)="onCloseIconClick($event)"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['toast.component.scss'],
  animations: [
    trigger('messageState', [
      state(
        'visible',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [
        style({ transform: '{{showTransformParams}}', opacity: 0 }),
        animate('{{showTransitionParams}}'),
      ]),
      transition('* => void', [
        animate(
          '{{hideTransitionParams}}',
          style({
            height: 0,
            opacity: 0,
            transform: '{{hideTransformParams}}',
          })
        ),
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent implements AfterViewInit, OnDestroy {
  timeout: NodeJS.Timeout | null = null

  @Input() index!: number
  @Input() hideTransformOptions!: string
  @Input() hideTransitionOptions!: string
  @Input() message!: IMessage
  @Input() showTransformOptions!: string
  @Input() showTransitionOptions!: string

  @Output() onClose = new EventEmitter<IOnClose>()

  constructor(public zone: NgZone) {}

  ngAfterViewInit(): void {
    this.initTimeout()
  }

  initTimeout() {
    if (!this.message.sticky) {
      this.zone.runOutsideAngular(() => {
        this.timeout = setTimeout(() => {
          this.onClose.emit({
            index: this.index,
            message: this.message,
          })
        }, this.message.life || 3000)
      })
    }
  }

  onCloseIconClick(event: Event): void {
    this.clearTimeout()

    this.onClose.emit({
      index: this.index,
      message: this.message,
    })

    event.preventDefault()
  }

  clearTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  onMouseEnter(): void {
    this.clearTimeout()
  }

  onMouseLeave(): void {
    this.initTimeout()
  }

  get classes() {
    return {
      [`hc-toast-message-${this.message.severity}`]: true,
      'hc-toast-message': true,
    }
  }

  ngOnDestroy(): void {
    this.clearTimeout()
  }
}
