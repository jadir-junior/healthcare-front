/* eslint-disable @typescript-eslint/no-explicit-any */

import { TemplateRef, ViewRef } from '@angular/core'

import { ObjectUtils } from './../../common/object-utils/object-utils'
import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { DomHandler } from './../../common/dom-handler/dom-handler'
import { HcConfig } from '../../common/hc-config/hc-config.service'
import { IStyle } from './../../common/models/style.model'
import { ZIndexUtils } from '../../common/z-index-utils/z-index-utils'
import {
  ConnectedOverlayScrollHandler,
  IConnectedOverlayScrollHandler,
} from '../../common/connected-overlay-scroll-handler/connected-overlay-scroll-handler'
import { ISelectItem } from './select-item.component'

export const SELECT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true,
}

@Component({
  selector: 'hc-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  providers: [SELECT_VALUE_ACCESSOR],
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('{{showTransitionParams}}'),
      ]),
      transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))]),
    ]),
  ],
})
export class SelectComponent<T> implements OnInit, ControlValueAccessor {
  _options: T[] = []
  private _disabled = false

  documentClickListener: (() => void) | null = null
  documentResizeListener: (() => void) | null = null
  focused = false
  id = String(Date.now() + Math.floor(Math.random() * 100))
  itemsWrapper: HTMLElement | HTMLDivElement | null = null
  labelId?: string
  listId?: string
  preventDocumentDefault = false
  preventModelTouched = false
  overlayVisible = false
  overlay: HTMLDivElement | null = null
  optionsToDisplay!: T[]
  scrollHandler!: IConnectedOverlayScrollHandler
  selectedOption!: ISelectItem<T>
  selectedItemTemplate!: TemplateRef<ISelectItem<T>>
  value: T | null = null

  @Input() autoZIndex = true
  @Input() appendTo: unknown
  @Input() ariaLabel?: string
  @Input() ariaLabelledBy?: string
  @Input() baseZIndex = 0
  @Input() dataKey?: string
  @Input() editable = false
  @Input() hideTransitionOptions = '0.1s linear'
  @Input() placeholder?: string
  @Input() optionValue?: string
  @Input() optionLabel?: string
  @Input() showClear = false
  @Input() showTransitionOptions = '0.12s cubic-bezier(0, 0, 0.2, 1)'
  @Input() selectIcon = 'expand_more'
  @Input() scrollHeight = '200px'
  @Input() style?: IStyle

  @Output() onBlur = new EventEmitter<Event>()
  @Output() onClick = new EventEmitter<Event>()
  @Output() onChange = new EventEmitter<{ originalEvent: Event; value: T | null }>()
  @Output() onClear = new EventEmitter<Event>()
  @Output() onFocus = new EventEmitter<Event>()
  @Output() onHide = new EventEmitter<AnimationEvent>()
  @Output() onShow = new EventEmitter<AnimationEvent>()

  @ViewChild('container') containerViewChild!: ElementRef
  @ViewChild('in') accessibleViewChild!: ElementRef

  @Input() get options(): T[] {
    return this._options
  }

  set options(val: T[]) {
    this._options = val
    this.optionsToDisplay = this._options
  }

  @Input() get disabled(): boolean {
    return this._disabled
  }

  set disabled(isDisabled: boolean) {
    if (isDisabled) {
      this.focused = false

      if (this.overlayVisible) {
        this.hide()
      }
    }

    this._disabled = isDisabled

    if (!(this.cd as ViewRef).destroyed) {
      this.cd.detectChanges()
    }
  }

  get isVisibleClearIcon(): boolean {
    return this.value !== null && this.value !== '' && this.showClear && !this.disabled
  }

  get label(): string | null {
    return this.selectedOption ? this.getOptionLabel(this.selectedOption) : null
  }

  onModelChange!: (value: T | null) => void
  onModelTouched!: () => void

  constructor(
    public cd: ChangeDetectorRef,
    public config: HcConfig,
    public el: ElementRef,
    public renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.optionsToDisplay = this.options
    this.labelId = this.id + '_label'
    this.listId = this.id + '_list'
  }

  writeValue(value: T | null): void {
    this.value = value
    this.cd.markForCheck()
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onModelChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.cd.markForCheck()
  }

  getOptionLabel(option: any) {
    return this.optionLabel
      ? ObjectUtils.resolveFieldData(option, this.optionLabel)
      : option && option.label !== undefined
      ? option.label
      : option
  }

  getOptionValue(option: ISelectItem<T>) {
    return this.optionValue
      ? ObjectUtils.resolveFieldData(option, this.optionValue)
      : !this.optionLabel && option && option.value !== undefined
      ? option.value
      : option
  }

  onMouseClick(event: Event): void {
    if (this.disabled) {
      return
    }

    this.onClick.emit(event)

    if (this.overlayVisible) {
      this.hide()
    } else {
      this.show()
    }
  }

  onInputFocus(event: Event) {
    this.focused = true
    this.onFocus.emit(event)
  }

  onInputBlur(event: Event): void {
    this.focused = false
    this.onBlur.emit(event)

    if (!this.preventModelTouched) {
      this.onModelTouched()
    }

    this.preventModelTouched = true
  }

  onItemClick(event: { originalEvent: Event; option: ISelectItem<T> }): void {
    const option = event.option

    this.selectItem(event.originalEvent, option)
    this.accessibleViewChild.nativeElement.focus({ preventScroll: true })

    setTimeout(() => {
      this.hide()
    }, 150)
  }

  selectItem(event: Event, option: ISelectItem<T>): void {
    if (this.selectedOption !== option) {
      this.selectedOption = option
      this.value = this.getOptionValue(option)

      this.onModelChange(this.value)
      this.onChange.emit({
        originalEvent: event,
        value: this.value,
      })
    }
  }

  show(): void {
    this.overlayVisible = true
    this.preventDocumentDefault = true
    this.focused = true
    this.cd.markForCheck()
  }

  hide(): void {
    this.overlayVisible = false
    this.focused = false
    this.cd.markForCheck()
  }

  clear(event: Event): void {
    this.value = null
    this.onModelChange(this.value)
    this.onChange.emit({ originalEvent: event, value: this.value })
    this.onClear.emit(event)
  }

  appendOverlay(): void {
    if (this.appendTo && this.overlay) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.overlay)
      } else {
        DomHandler.appendChild(this.overlay, this.appendTo as HTMLElement)
      }
    }
  }

  alignOverlay(): void {
    if (this.overlay) {
      if (this.appendTo) {
        DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement)
      } else {
        DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement)
      }
    }
  }

  isOutsideClicked(event: Event): boolean {
    return !(
      this.el.nativeElement.isSameNode(event.target) ||
      this.el.nativeElement.contains(event.target) ||
      (this.overlay && this.overlay.contains(<Node>event.target))
    )
  }

  unbindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener()
      this.documentClickListener = null
    }
  }

  bindDocumentClickListener(): void {
    if (!this.documentClickListener) {
      const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document'

      this.documentClickListener = this.renderer.listen(
        documentTarget,
        'click',
        (event) => {
          if (!this.preventDocumentDefault && this.isOutsideClicked(event)) {
            this.hide()
            this.unbindDocumentClickListener()
          }
          this.preventDocumentDefault = false
        }
      )
    }
  }

  onWindowResize(): void {
    if (this.overlayVisible && !DomHandler.isTouchDevice()) {
      this.hide()
    }
  }

  bindDocumentResizeListener(): void {
    this.documentResizeListener = this.onWindowResize.bind(this)
    window.addEventListener('resize', this.documentResizeListener)
  }

  bindScrollListener(): void {
    if (!this.scrollHandler) {
      this.scrollHandler = new ConnectedOverlayScrollHandler(
        this.containerViewChild.nativeElement,
        () => {
          if (this.overlayVisible) {
            this.hide()
          }
        }
      )
    }

    this.scrollHandler.bindScrollListener()
  }

  unbindDocumentResizeListener(): void {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener)
      this.documentResizeListener = null
    }
  }

  unbindScrollListener(): void {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener()
    }
  }

  onOverlayHide(): void {
    this.unbindDocumentClickListener()
    this.unbindDocumentResizeListener()
    this.unbindScrollListener()
    this.overlay = null
    this.itemsWrapper = null
    this.onModelTouched()
  }

  onOverlayAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
        this.overlay = event.element
        if (this.overlay) {
          this.itemsWrapper = DomHandler.findSingleElement(
            this.overlay,
            'hc-dropdown-items-wrapper'
          )

          this.appendOverlay()

          if (this.autoZIndex) {
            ZIndexUtils.set(
              'overlay',
              this.overlay,
              this.baseZIndex + this.config.zIndex.overlay
            )
          }

          this.alignOverlay()
          this.bindDocumentClickListener()
          this.bindDocumentResizeListener()
          this.bindScrollListener()

          if (this.options && this.options.length && this.itemsWrapper) {
            const selectedListItem = DomHandler.findSingleElement(
              this.itemsWrapper,
              '.hc-select-item.hc-select-highlight'
            )

            if (selectedListItem) {
              selectedListItem.scrollIntoView({ block: 'nearest', inline: 'center' })
            }
          }

          this.onShow.emit(event)
        }
        break

      case 'void':
        this.onOverlayHide()
        this.onHide.emit(event)
        break
    }
  }

  onOverlayAnimationEnd(event: AnimationEvent): void {
    switch (event.toState) {
      case 'void':
        ZIndexUtils.clear(event.element)
        break
    }
  }

  get containerClasses() {
    return {
      ['hc-select']: true,
      ['hc-select-clearable']: this.showClear && !this.disabled,
      ['hc-select-open']: this.overlayVisible,
      ['hc-select-focused']: this.focused,
      ['hc-select-disabled']: this.disabled,
    }
  }

  get placeholderClasses() {
    return {
      ['hc-select-label']: true,
      ['hc-select-inputtext']: true,
      ['hc-select-placeholder']: true,
      ['hc-select-placeholder-empty']:
        this.placeholder === null ||
        this.placeholder === undefined ||
        this.placeholder?.length === 0,
    }
  }

  get labelClasses() {
    return {
      ['hc-select-label']: true,
      ['hc-select-inputtext']: true,
    }
  }
}
