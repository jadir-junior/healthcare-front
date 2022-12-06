import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

import { DomHandler } from '../../common/dom-handler/dom-handler'
import { ZIndexUtils } from '../../common/z-index-utils/z-index-utils'

export interface ITooltipOptions {
  showDelay?: number
  disabled?: boolean
  positionStyle?: string
  tooltipLabel: string
  tooltipPosition: 'right' | 'left' | 'top' | 'bottom'
  tooltipEvent: 'hover' | 'focus'
  appendTo: 'body' | 'target' | HTMLElement
  tooltipZIndex: 'auto'
  escape: boolean
  positionTop: number
  positionLeft: number
  tooltipStyleClass?: string
}

@Directive({
  selector: '[hcTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnChanges {
  mouseEnterListener?: () => void
  showTimeout: undefined | number | NodeJS.Timeout = undefined
  hideTimeout: undefined | number | NodeJS.Timeout = undefined
  timeout: null | number = null
  container!: HTMLElement
  active = false
  tooltipText!: HTMLDivElement
  fitContent = true

  @Input('hcTooltip') text!: string

  _tooltipOptions: ITooltipOptions = {
    tooltipLabel: '',
    tooltipPosition: 'right',
    tooltipEvent: 'hover',
    appendTo: 'body',
    tooltipZIndex: 'auto',
    escape: true,
    positionTop: 0,
    positionLeft: 0,
  }

  constructor(public zone: NgZone, public el: ElementRef) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (this._tooltipOptions.tooltipEvent === 'hover') {
        // this.mouseEnterListener =
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.setOptions({
        ...this._tooltipOptions,
        tooltipLabel: changes['text'].currentValue,
      })

      // if (this.active) {
      // } else {
      //   this.hide()
      // }
    }

    if (changes['tooltipOptions']) {
      this._tooltipOptions = {
        ...this._tooltipOptions,
        ...changes['tooltipOptions'].currentValue,
      }
    }
  }

  setOptions(option: ITooltipOptions) {
    this._tooltipOptions = { ...this._tooltipOptions, ...option }
  }

  onMouseEnter() {
    if (!this.container && !this.showTimeout) {
      this.activate()
    }
  }

  hide(): void {
    if (this._tooltipOptions.tooltipZIndex === 'auto' && this.container) {
      ZIndexUtils.clear(this.container)
    }

    this.remove()
  }

  remove(): void {
    if (this.container && this.container.parentElement) {
      if (this._tooltipOptions.appendTo === 'body') {
        document.body.removeChild(this.container)
      } else if (this._tooltipOptions.appendTo === 'target') {
        this.el.nativeElement.removeChild(this.container)
      } else {
        DomHandler.removeChild(this.container, this._tooltipOptions.appendTo)
      }
    }
  }

  // clearTimeout(): void {
  //   if (this.timeout) {
  //     this.timeout = null
  //   }
  // }

  clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = undefined
    }
  }

  updateText(): void {
    if (this._tooltipOptions.escape) {
      this.tooltipText.innerHTML = ''
      this.tooltipText.appendChild(
        document.createTextNode(this._tooltipOptions.tooltipLabel)
      )
    } else {
      this.tooltipText.innerHTML = this._tooltipOptions.tooltipLabel
    }
  }

  create(): void {
    if (this.container) {
      this.clearHideTimeout()
      this.remove()
    }

    this.container = document.createElement('div')

    const tooltipArrow = document.createElement('div')
    tooltipArrow.className = 'hc-tooltip-arrow'
    this.container.appendChild(tooltipArrow)

    this.tooltipText = document.createElement('div')
    this.tooltipText.className = 'hc-tooltip-text'

    this.updateText()

    if (this._tooltipOptions?.positionStyle) {
      this.container.style.position = this._tooltipOptions.positionStyle
    }

    this.container.appendChild(this.tooltipText)

    if (this._tooltipOptions.appendTo === 'body') {
      document.body.appendChild(this.container)
    } else if (this._tooltipOptions.appendTo === 'target') {
      DomHandler.appendChild(this.container, this.el.nativeElement)
    } else {
      DomHandler.appendChild(this.container, this._tooltipOptions.appendTo)
    }

    this.container.style.display = 'inline-block'

    if (this.fitContent) {
      this.container.style.width = 'fit-content'
    }
  }

  preAlign(position: string): void {
    this.container.style.left = '-999px'
    this.container.style.top = '-999px'

    const defaultClassName = 'hc-tooltip hc-tooltip-' + position
    this.container.className = this._tooltipOptions?.tooltipStyleClass
      ? defaultClassName + ' ' + this._tooltipOptions.tooltipStyleClass
      : defaultClassName
  }

  getHostOffset(): { left: number; top: number } {
    if (
      this._tooltipOptions.appendTo === 'body' ||
      this._tooltipOptions.appendTo === 'target'
    ) {
      const offset = this.el.nativeElement.getBoundingClientRect()
      const targetLeft = offset.left + DomHandler.getWindowScrollLeft()
      const targetTop = offset.top + DomHandler.getWindowScrollTop()

      return { left: targetLeft, top: targetTop }
    } else {
      return { left: 0, top: 0 }
    }
  }

  alignTop(): void {
    this.preAlign('top')
    const hostOffset = this.getHostOffset()
    const left =
      hostOffset.left +
      (DomHandler.getOuterWidth(this.el.nativeElement) -
        DomHandler.getOuterWidth(this.container)) /
        2
    const top = hostOffset.top - DomHandler.getOuterHeight(this.container)
    this.container.style.left = left + this._tooltipOptions.positionLeft + 'px'
    this.container.style.top = top + this._tooltipOptions.positionTop + 'px'
  }

  align(): void {
    const position = this._tooltipOptions.tooltipPosition

    switch (position) {
      case 'top':
        this.alignTop()
    }
  }

  show(): void {
    if (!this._tooltipOptions.tooltipLabel || !this._tooltipOptions.disabled) {
      return
    }

    this.create()
    this.align()
  }

  activate(): void {
    this.active = true
    this.clearHideTimeout()

    if (this._tooltipOptions.showDelay) {
      this.showTimeout = setTimeout(() => {
        this.show()
      }, this._tooltipOptions.showDelay)
    }
  }
}
