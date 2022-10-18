import {
  AnimationEvent,
  animateChild,
  query,
  transition,
  trigger,
} from '@angular/animations'
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'
import { IMessage, MessageService } from './message.service'

import { HcConfig } from '../../common/hc-config/hc-config.service'
import { IOnClose } from './toast-item.component'
import { ObjectUtils } from './../../common/object-utils/object-utils'
import { Subscription } from 'rxjs'
import { ZIndexUtils } from '../../common/z-index-utils/z-index-utils'

@Component({
  selector: 'hc-toast',
  template: `
    <div #container [ngClass]="'hc-toast hc-toast-' + position">
      <hc-toast-item
        *ngFor="let message of messages; let i = index"
        @toastAnimation
        [message]="message"
        [index]="i"
        [showTransformOptions]="showTransformOptions"
        [showTransitionOptions]="showTransitionOptions"
        [hideTransformOptions]="hideTransformOptions"
        [hideTransitionOptions]="hideTransitionOptions"
        (onClose)="onToastClose($event)"
        (@toastAnimation.start)="onAnimationStart($event)"
        (@toastAnimation.done)="onAnimationEnd($event)"
      ></hc-toast-item>
    </div>
  `,
  styleUrls: ['toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      transition(':enter, :leave', [query('@*', animateChild())]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: IMessage[] | null = null
  messagesArchieve!: IMessage[]
  messageSubscription!: Subscription

  @Input() autoZIndex = true
  @Input() baseZIndex = 0
  @Input() hideTransformOptions = 'translateY(-100%)'
  @Input() hideTransitionOptions = '250ms ease-in'
  @Input() key?: string
  @Input() preventOpenDuplicates = false
  @Input() preventDuplicates = false
  @Input() position = 'top-right'
  @Input() showTransformOptions = 'translateY(100%)'
  @Input() showTransitionOptions = '300ms ease-out'

  @Output() onClose = new EventEmitter<{ message: IMessage }>()

  @ViewChild('container') containerViewChild!: ElementRef<HTMLDivElement>

  constructor(
    public messageService: MessageService,
    public config: HcConfig,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageService.messageObserver.subscribe(
      (messages) => {
        if (messages) {
          if (messages instanceof Array) {
            const filteredMessages = messages.filter((m) => this.canAdd(m))
            this.add(filteredMessages)
          } else if (this.canAdd(messages)) {
            this.add([messages])
          }
        }
      }
    )
  }

  add(messages: IMessage[]): void {
    this.messages = this.messages ? [...this.messages, ...messages] : [...messages]

    if (this.preventDuplicates) {
      this.messagesArchieve = this.messagesArchieve
        ? [...this.messagesArchieve, ...messages]
        : [...messages]
    }

    this.cd.markForCheck()
  }

  containsMessage(collection: IMessage[], message: IMessage): boolean {
    if (!collection) {
      return false
    }

    return (
      collection.find((m) => {
        return m.detail === message.detail && m.severity === message.severity
      }) !== null
    )
  }

  canAdd(message: IMessage): boolean {
    let allow = this.key === message.key

    if (allow && this.preventOpenDuplicates && this.messages) {
      allow = !this.containsMessage(this.messages, message)
    }

    if (allow && this.preventDuplicates) {
      allow = !this.containsMessage(this.messagesArchieve, message)
    }

    return allow
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.fromState === 'void') {
      if (this.autoZIndex && this.containerViewChild.nativeElement.style.zIndex === '') {
        ZIndexUtils.set(
          'modal',
          this.containerViewChild.nativeElement,
          this.baseZIndex || this.config.zIndex.modal
        )
      }
    }
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.toState === 'void') {
      if (this.autoZIndex && ObjectUtils.isEmpty(this.messages)) {
        ZIndexUtils.clear(this.containerViewChild.nativeElement)
      }
    }
  }

  onToastClose(event: IOnClose) {
    this.messages?.splice(event.index, 1)

    this.onClose.emit({
      message: event.message,
    })

    this.cd.detectChanges()
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }

    if (this.containerViewChild && this.autoZIndex) {
      ZIndexUtils.clear(this.containerViewChild.nativeElement)
    }
  }
}
