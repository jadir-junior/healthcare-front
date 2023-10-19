import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  NgZone,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core'
import {
  AnimationEvent,
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations'

import { DomHandler } from '../../common/dom-handler/dom-handler'
import { HcConfig } from '../../common/hc-config/hc-config.service'
import { IStyle } from './../../common/models/style.model'
import { TemplateDirective } from 'src/app/directives/template/template.directive'
import { ZIndexUtils } from 'src/app/common/z-index-utils/z-index-utils'

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}'),
])

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
])

@Component({
  selector: 'hc-modal',
  template: `
    <div *ngIf="maskVisible" [ngClass]="classes">
      <div
        *ngIf="visible"
        [attr.aria-labelledby]="id + '-label'"
        [ngClass]="containerClasses"
        [ngStyle]="style"
        [@animation]="{
          value: 'visible',
          params: { transform: transformOptions, transition: transitionOptions }
        }"
        (@animation.start)="onAnimationStart($event)"
        (@animation.done)="onAnimationEnd($event)"
        role="modal"
      >
        <div class="hc-modal-header">
          <span [attr.id]="id + '-label'" class="hc-modal-title">{{ header }}</span>
          <div class="hc-modal-header-icons">
            <button
              *ngIf="closable"
              type="button"
              class="hc-modal-header-icon"
              [attr.aria-label]="closeAriaLabel"
              [attr.tabindex]="closeTabindex"
              (click)="close($event)"
            >
              <span class="material-symbols-outlined hc-modal-header-close">
                {{ closeIcon }}
              </span>
            </button>
          </div>
        </div>
        <div class="hc-modal-content">
          <ng-content></ng-content>
        </div>
        <div class="hc-modal-footer" *ngIf="footerTemplate">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('animation', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements AfterContentInit {
  _visible = false

  container: HTMLDivElement | null = null
  maskVisible = false
  transformOptions = 'scale(0.7)'
  wrapper: HTMLElement | null = null
  footerTemplate!: TemplateRef<TemplateDirective>

  @Input() appendTo?: string | HTMLElement
  @Input() autoZIndex = true
  @Input() baseZIndex = 0
  @Input() closable = true
  @Input() closeAriaLabel = 'close'
  @Input() closeIcon = 'x'
  @Input() closeTabindex = '-1'
  @Input() dismissableMask = false
  @Input() focusOnShow = true
  @Input() id?: string
  @Input() header?: string
  @Input() modal = false
  @Input() style?: IStyle
  @Input() transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)'

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() onHide = new EventEmitter()
  @Output() onShow = new EventEmitter()

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  @Input() get visible(): boolean {
    return this._visible
  }

  set visible(value: boolean) {
    this._visible = value

    if (this._visible && !this.maskVisible) {
      this.maskVisible = true
    }
  }

  constructor(
    public config: HcConfig,
    public zone: NgZone
  ) {}

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'footer':
          this.footerTemplate = item.template
          break
      }
    })
  }

  close(event: Event): void {
    this.visibleChange.emit(false)
    event.preventDefault()
  }

  moveOnTop(): void {
    if (this.autoZIndex && this.container && this.wrapper) {
      ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal)
      this.wrapper.style.zIndex = String(parseInt(this.container.style.zIndex, 10) - 1)
    }
  }

  appendContainer(): void {
    if (this.appendTo && this.wrapper) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.wrapper)
      } else {
        DomHandler.appendChild(this.wrapper, this.appendTo as HTMLElement)
      }
    }
  }

  focus(): void {
    if (this.container) {
      const focusable = DomHandler.findSingleElement(this.container, '[autofocus]')
      if (focusable) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => focusable.focus(), 5)
        })
      }
    }
  }

  onContainerDestroy(): void {
    this.maskVisible = false

    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container)
    }

    this.container = null
    this.wrapper = null
  }

  onAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
        this.container = event.element
        if (this.container && this.container.parentElement) {
          this.wrapper = this.container.parentElement
          this.appendContainer()

          if (this.id) {
            this.container.setAttribute(this.id, '')
          }
        }

        this.moveOnTop()

        if (this.focusOnShow) {
          this.focus()
        }

        break
      case 'void':
        if (this.wrapper && this.modal) {
          DomHandler.addClass(this.wrapper, 'hc-modal-overlay-leave')
        }
        break
    }
  }

  onAnimationEnd(event: AnimationEvent): void {
    switch (event.toState) {
      case 'void':
        this.onContainerDestroy()
        this.onHide.emit()
        break
      case 'visible':
        this.onShow.emit()
        break
    }
  }

  get classes() {
    return {
      ['hc-modal-mask']: true,
      ['hc-modal-overlay hc-modal-overlay-enter']: this.modal,
    }
  }

  get containerClasses() {
    return {
      ['hc-modal']: true,
    }
  }
}
