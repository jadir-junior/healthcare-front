import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export interface IMessage {
  severity?: 'success' | 'error'
  detail?: string
  key?: string
  closable?: boolean
  life?: number
  sticky?: boolean
}

@Injectable()
export class MessageService {
  private messageSource = new Subject<IMessage | IMessage[]>()
  private clearSource = new Subject<string>()

  messageObserver = this.messageSource.asObservable()
  clearObserver = this.clearSource.asObservable()

  add(message: IMessage) {
    if (message) {
      this.messageSource.next(message)
    }
  }
}
