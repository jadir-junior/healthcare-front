import { DomHandler } from '../dom-handler/dom-handler'

export interface IConnectedOverlayScrollHandler {
  bindScrollListener: () => void
  unbindScrollListener: () => void
  destroy: () => void
}

export class ConnectedOverlayScrollHandler {
  element: HTMLElement | null
  listener: null | Function
  scrollableParents: Array<any> | null = null

  constructor(element: HTMLElement, listener: Function) {
    this.element = element
    this.listener = listener
  }

  bindScrollListener(): void {
    this.scrollableParents = DomHandler.getScrollableParents(this.element)
    for (let i = 0; i < this.scrollableParents.length; i++) {
      this.scrollableParents[i].addEventListener('scroll', this.listener)
    }
  }

  unbindScrollListener() {
    if (this.scrollableParents) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].removeEventListener('scroll', this.listener)
      }
    }
  }

  destroy(): void {
    this.unbindScrollListener()
    this.element = null
    this.listener = null
    this.scrollableParents = null
  }
}
