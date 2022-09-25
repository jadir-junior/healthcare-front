import { DomHandler } from '../dom-handler/dom-handler'

export interface IConnectedOverlayScrollHandler {
  bindScrollListener: () => void
  unbindScrollListener: () => void
  destroy: () => void
}

export class ConnectedOverlayScrollHandler {
  element: HTMLElement | null
  listener: null | ((this: HTMLElement, ev: Event) => void)
  scrollableParents: HTMLElement[] | null = null

  constructor(element: HTMLElement, listener: () => void) {
    this.element = element
    this.listener = listener
  }

  bindScrollListener(): void {
    this.scrollableParents = DomHandler.getScrollableParents(this.element)
    for (let i = 0; i < this.scrollableParents.length; i++) {
      if (this.listener) {
        this.scrollableParents[i].addEventListener('scroll', this.listener)
      }
    }
  }

  unbindScrollListener() {
    if (this.scrollableParents) {
      for (let i = 0; i < this.scrollableParents.length; i++) {
        if (this.listener) {
          this.scrollableParents[i].removeEventListener('scroll', this.listener)
        }
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
