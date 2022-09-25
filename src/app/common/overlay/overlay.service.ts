import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export interface IMessage {
  severity?: string
  summary?: string
  detail?: string | number
  id?: any
  key?: string
  life?: number
  sticky?: boolean
  closable?: boolean
  data?: any
  icon?: string
  contentStyleClass?: string
  styleClass?: string
}

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private clickSource = new Subject<IMessage | IMessage[]>()

  clickObservable = this.clickSource.asObservable()

  add(event: { originalEvent: IMessage | IMessage[]; target: HTMLElement }): void {
    if (event) {
      this.clickSource.next(event.originalEvent)
    }
  }
}
