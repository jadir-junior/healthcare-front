import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core'
import {
  ConnectedOverlayScrollHandler,
  IConnectedOverlayScrollHandler,
} from '../../common/connected-overlay-scroll-handler/connected-overlay-scroll-handler'

import { DomHandler } from '../../common/dom-handler/dom-handler'
import { HcConfig } from '../../common/hc-config/hc-config.service'
import { ZIndexUtils } from '../../common/z-index-utils/z-index-utils'

export interface ITooltipOptions {
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
  life?: number
  hideDelay?: number
  showDelay?: number
}

@Directive({
  selector: '[hcTooltip]',
})
export class TooltipDirective implements AfterViewInit, OnChanges, OnDestroy {
  mouseEnterListener?: () => void
  mouseLeaveListener?: () => void
  clickListener?: () => void
  focusListener?: () => void
  blurListener?: () => void
  showTimeout?: null | number
  hideTimeout?: null | number
  timeout: null | number = null
  container: HTMLElement | null = null
  active = false
  tooltipText!: HTMLDivElement
  resizeListener?: (() => void) | null
  scrollHandler?: IConnectedOverlayScrollHandler | null
  _disabled = false

  @Input('hcTooltip') text!: string
  @Input() ariaLabel?: string
  @Input() tooltipColor?: 'primary' | 'secondary' = 'primary'
  @Input() life?: number
  @Input() hideDelay?: number
  @Input() showDelay?: number
  @Input() tooltipPosition: 'right' | 'left' | 'top' | 'bottom' = 'right'
  @Input() fitContent = true
  @Input() tooltipEvent: 'hover' | 'focus' = 'hover'
  @Input() appendTo?: HTMLElement | string
  @Input() escape = true
  @Input() showTooltipArrow = true
  @Input('tooltipDisabled') get disabled(): boolean {
    return this._disabled
  }

  set disabled(value: boolean) {
    this._disabled = value
    this.deactivate()
  }

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

  constructor(
    public zone: NgZone,
    public el: ElementRef,
    public config: HcConfig
  ) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      if (this._tooltipOptions.tooltipEvent === 'hover') {
        this.mouseEnterListener = this.onMouseEnter.bind(this)
        this.mouseLeaveListener = this.onMouseLeave.bind(this)
        this.clickListener = this.onClick.bind(this)
        this.el.nativeElement.addEventListener('mouseenter', this.mouseEnterListener)
        this.el.nativeElement.addEventListener('mouseleave', this.mouseLeaveListener)
        this.el.nativeElement.addEventListener('click', this.clickListener)
      } else if (this._tooltipOptions.tooltipEvent === 'focus') {
        this.focusListener = this.onFocus.bind(this)
        this.blurListener = this.onBlur.bind(this)

        const target = this.getTarget(this.el.nativeElement)
        if (target) {
          target.addEventListener('focus', this.focusListener)
          target.addEventListener('blur', this.blurListener)
        }
      }
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tooltipPosition']) {
      this.setOptions({
        tooltipPosition: changes['tooltipPosition'].currentValue,
      })
    }

    if (changes['tooltipEvent']) {
      this.setOptions({
        tooltipEvent: changes['tooltipEvent'].currentValue,
      })
    }

    if (changes['appendTo']) {
      this.setOptions({
        appendTo: changes['appendTo'].currentValue,
      })
    }

    if (changes['tooltipZIndex']) {
      this.setOptions({
        tooltipZIndex: changes['tooltipZIndex'].currentValue,
      })
    }

    if (changes['escape']) {
      this.setOptions({
        escape: changes['escape'].currentValue,
      })
    }

    if (changes['hideDelay']) {
      this.setOptions({
        hideDelay: changes['hideDelay'].currentValue,
      })
    }

    if (changes['showDelay']) {
      this.setOptions({
        showDelay: changes['showDelay'].currentValue,
      })
    }

    if (changes['life']) {
      this.setOptions({
        life: changes['life'].currentValue,
      })
    }

    if (changes['disabled']) {
      this.setOptions({
        disabled: changes['disabled'].currentValue,
      })
    }

    if (changes['text']) {
      this.setOptions({
        tooltipLabel: changes['text'].currentValue,
      })

      if (this.active) {
        if (changes['text'].currentValue) {
          if (this.container && this.container.offsetParent) {
            this.updateText()
            this.align()
          } else {
            this.show()
          }
        }
      } else {
        this.hide()
      }
    }

    if (changes['tooltipOptions']) {
      this._tooltipOptions = {
        ...this._tooltipOptions,
        ...changes['tooltipOptions'].currentValue,
      }

      this.deactivate()

      if (this.active) {
        if (this._tooltipOptions.tooltipLabel) {
          if (this.container && this.container.offsetParent) {
            this.updateText()
            this.align()
          } else {
            this.show()
          }
        } else {
          this.hide()
        }
      }
    }
  }

  getTarget(element: HTMLElement): HTMLElement | null {
    return DomHandler.hasClass(element, 'hc-inputwrapper')
      ? DomHandler.findSingleElement(element, 'input')
      : element
  }

  setOptions(option: Partial<ITooltipOptions>) {
    this._tooltipOptions = { ...this._tooltipOptions, ...option }
  }

  onMouseEnter() {
    if (!this.container && !this.showTimeout) {
      this.activate()
    }
  }

  onMouseLeave(): void {
    this.deactivate()
  }

  onClick(): void {
    this.deactivate()
  }

  onFocus(): void {
    this.activate()
  }

  onBlur(): void {
    this.deactivate()
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

    this.unbindDocumentResizeListener()
    this.unbindScrollListener()
    this.clearTimeouts()
    this.container = null
    this.scrollHandler = null
  }

  clearShowTimeout() {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }
  }

  clearHideTimeout(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }
  }

  clearTimeouts(): void {
    this.clearShowTimeout()
    this.clearHideTimeout()
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
    if (this.ariaLabel) {
      this.container.setAttribute('aria-label', this.ariaLabel)
    }

    if (this.showTooltipArrow) {
      const tooltipArrow = document.createElement('div')
      tooltipArrow.className = `hc-tooltip-arrow hc-tooltip-arrow-${this.tooltipColor}`
      tooltipArrow.setAttribute('aria-label', 'tooltip-arrow')
      this.container.appendChild(tooltipArrow)
    }

    this.tooltipText = document.createElement('div')
    this.tooltipText.className = `hc-tooltip-text hc-tooltip-text-${this.tooltipColor}`
    this.tooltipText.setAttribute('aria-label', 'tooltip-text')

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
    if (this.container) {
      this.container.style.left = '-999px'
      this.container.style.top = '-999px'

      const defaultClassName = 'hc-tooltip hc-tooltip-' + position
      this.container.className = this._tooltipOptions?.tooltipStyleClass
        ? defaultClassName + ' ' + this._tooltipOptions.tooltipStyleClass
        : defaultClassName
    }
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
    if (this.container) {
      this.preAlign('top')
      const hostOffset = this.getHostOffset()
      const left =
        hostOffset.left +
        (DomHandler.getOuterWidth(this.el.nativeElement) -
          DomHandler.getOuterWidth(this.container)) /
          2
      const top = hostOffset.top - DomHandler.getOuterHeight(this.container)
      this.setContainerStyleLeftAndTop(left, top)
    }
  }

  alignBottom(): void {
    if (this.container) {
      this.preAlign('bottom')
      const hostOffset = this.getHostOffset()
      const left =
        hostOffset.left +
        (DomHandler.getOuterWidth(this.el.nativeElement) -
          DomHandler.getOuterWidth(this.container)) /
          2
      const top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement)
      this.setContainerStyleLeftAndTop(left, top)
    }
  }

  alignRight(): void {
    if (this.container) {
      this.preAlign('right')
      const hostOffset = this.getHostOffset()
      const left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement)
      const top =
        hostOffset.top +
        (DomHandler.getOuterHeight(this.el.nativeElement) -
          DomHandler.getOuterHeight(this.container)) /
          2
      this.setContainerStyleLeftAndTop(left, top)
    }
  }

  alignLeft(): void {
    if (this.container) {
      this.preAlign('left')
      const hostOffset = this.getHostOffset()
      const left = hostOffset.left - DomHandler.getOuterWidth(this.container)
      const top =
        hostOffset.top +
        (DomHandler.getOuterHeight(this.el.nativeElement) -
          DomHandler.getOuterHeight(this.container)) /
          2
      this.setContainerStyleLeftAndTop(left, top)
    }
  }

  setContainerStyleLeftAndTop(left: number, top: number): void {
    if (this.container) {
      this.container.style.left = left + this._tooltipOptions['positionLeft'] + 'px'
      this.container.style.top = top + this._tooltipOptions['positionTop'] + 'px'
    }
  }

  isOutOfBounds(): boolean {
    if (this.container) {
      const offset = this.container.getBoundingClientRect()
      const targetTop = offset.top
      const targetLeft = offset.left
      const width = DomHandler.getOuterWidth(this.container)
      const height = DomHandler.getOuterHeight(this.container)
      const viewport = DomHandler.getViewport()

      return (
        targetLeft + width > viewport.width ||
        targetLeft < 0 ||
        targetTop < 0 ||
        targetTop + height > viewport.height
      )
    } else {
      return false
    }
  }

  positionTop(): void {
    this.alignTop()
    if (this.isOutOfBounds()) {
      this.alignBottom()
      if (this.isOutOfBounds()) {
        this.alignRight()
        if (this.isOutOfBounds()) {
          this.alignLeft()
        }
      }
    }
  }

  positionBottom(): void {
    this.alignBottom()
    if (this.isOutOfBounds()) {
      this.alignTop()
      if (this.isOutOfBounds()) {
        this.alignRight()
        if (this.isOutOfBounds()) {
          this.alignLeft()
        }
      }
    }
  }

  positionLeft(): void {
    this.alignLeft()
    if (this.isOutOfBounds()) {
      this.alignRight()
      if (this.isOutOfBounds()) {
        this.alignTop()
        if (this.isOutOfBounds()) {
          this.alignBottom
        }
      }
    }
  }

  positionRight(): void {
    this.alignRight()
    if (this.isOutOfBounds()) {
      this.alignLeft()
      if (this.isOutOfBounds()) {
        this.alignTop()
        if (this.isOutOfBounds()) {
          this.alignBottom()
        }
      }
    }
  }

  align(): void {
    const position = this._tooltipOptions.tooltipPosition

    switch (position) {
      case 'top':
        this.positionTop()
        break
      case 'bottom':
        this.positionBottom()
        break
      case 'left':
        this.positionLeft()
        break
      case 'right':
        this.positionRight()
        break
    }
  }

  onWindowResize(): void {
    this.hide()
  }

  bindDocumentResizeListener(): void {
    this.zone.runOutsideAngular(() => {
      this.resizeListener = this.onWindowResize.bind(this)
      window.addEventListener('resize', this.resizeListener)
    })
  }

  unbindDocumentResizeListener(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener)
      this.resizeListener = null
    }
  }

  bindScrollListener(): void {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(
        this.el.nativeElement,
        () => {
          if (this.container) {
            this.hide()
          }
        }
      )
    }
  }

  unbindScrollListener(): void {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener()
    }
  }

  show(): void {
    if (!this._tooltipOptions.tooltipLabel || this._tooltipOptions.disabled) {
      return
    }

    this.create()
    this.align()
    if (this.container) {
      DomHandler.fadeIn(this.container, 250)

      if (this._tooltipOptions.tooltipZIndex === 'auto') {
        ZIndexUtils.set('tooltip', this.container, this.config.zIndex.tooltip)
      } else {
        this.container.style.zIndex = this._tooltipOptions.tooltipZIndex
      }
    }

    this.bindDocumentResizeListener()
    this.bindScrollListener()
  }

  activate(): void {
    this.active = true
    this.clearHideTimeout()

    if (this._tooltipOptions.showDelay) {
      this.showTimeout = window.setTimeout(() => {
        this.show()
      }, this._tooltipOptions.showDelay)
    } else {
      this.show()
    }

    if (this._tooltipOptions.life) {
      const duration = this._tooltipOptions.showDelay
        ? this._tooltipOptions.life + this._tooltipOptions.showDelay
        : this._tooltipOptions.life
      this.hideTimeout = window.setTimeout(() => {
        this.hide()
      }, duration)
    }
  }

  deactivate(): void {
    this.active = false
    this.clearShowTimeout()

    if (this._tooltipOptions.hideDelay) {
      this.clearHideTimeout()
      this.hideTimeout = window.setTimeout(() => {
        this.hide()
      }, this._tooltipOptions.hideDelay)
    } else {
      this.hide()
    }
  }

  unbindEvents(): void {
    if (this._tooltipOptions.tooltipEvent === 'hover') {
      this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener)
      this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener)
      this.el.nativeElement.removeEventListener('click', this.clickListener)
    } else if (this._tooltipOptions.tooltipEvent === 'focus') {
      const target = this.getTarget(this.el.nativeElement)

      if (target) {
        if (this.focusListener) {
          target.removeEventListener('focus', this.focusListener)
        }

        if (this.blurListener) {
          target.removeEventListener('blur', this.blurListener)
        }
      }
    }

    this.unbindDocumentResizeListener()
  }

  ngOnDestroy(): void {
    this.unbindEvents()

    if (this.container) {
      ZIndexUtils.clear(this.container)
    }

    this.remove()

    if (this.scrollHandler) {
      this.scrollHandler.destroy()
      this.scrollHandler = null
    }
  }
}
