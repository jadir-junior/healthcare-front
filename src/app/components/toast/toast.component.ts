import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { IMessage, MessageService } from './message.service'

import { Subscription } from 'rxjs'

@Component({
  selector: 'hc-toast',
  template: `
    <div [ngClass]="'hc-toast hc-toast-' + position">
      <hc-toast-item [message]="message"></hc-toast-item>
    </div>
  `,
  styleUrls: ['toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  message?: IMessage
  messageSubscription!: Subscription

  @Input() key?: string
  @Input() position = 'top-right'

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.message = {
      severity: 'success',
      detail: 'Message Content',
    }
    // this.messageSubscription = this.messageService.messageObserver.subscribe(
    //   (message) => {
    //     if (message) {
    //       this.message = message
    //     }
    //   }
    // )
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }
  }
}
