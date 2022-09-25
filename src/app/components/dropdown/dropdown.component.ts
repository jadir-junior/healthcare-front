import { IMessage } from './../../common/overlay/overlay.service'
import { Subscription } from 'rxjs'
import { DomHandler } from './../../common/dom-handler/dom-handler'
import { TemplateDirective } from 'src/app/directives/template/template.directive'
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewRef,
} from '@angular/core'
import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'
import { ZIndexUtils } from 'src/app/common/z-index-utils/z-index-utils'
import { HcConfig } from 'src/app/common/hc-config/hc-config.service'
import {
  ConnectedOverlayScrollHandler,
  IConnectedOverlayScrollHandler,
} from 'src/app/common/connected-overlay-scroll-handler/connected-overlay-scroll-handler'
import { OverlayService } from 'src/app/common/overlay/overlay.service'

@Component({
  selector: 'hc-dropdown',
  template: `
    <div
      *ngIf="render"
      class="hc-dropdown-panel"
      [ngStyle]="style"
      (click)="onOverlayClick($event)"
      [@animation]="{
        value: overlayVisible ? 'open' : 'close',
        params: {
          showTransitionParams: showTransitionOptions,
          hideTransitionParams: hideTransitionOptions
        }
      }"
      (@animation.start)="onAnimationStart($event)"
      (@animation.done)="onAnimationEnd($event)"
    >
      <div class="hc-dropdown-content">
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['dropdown.component.scss'],
  animations: [
    trigger('animation', [
      state(
        'void',
        style({
          transform: 'scaleY(0.8)',
          opacity: 0,
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => open', animate('{{showTransitionParams}}')),
      transition('open => close', animate('{{hideTransitionParams}}')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements AfterContentInit, OnDestroy {
  contentTemplate!: TemplateRef<any>
  container!: HTMLDivElement
  destroyCallback: Function | null = null
  documentClickListener: Function | null = null
  documentResizeListener: EventListener | null = null
  isOverlayAnimationInProgress = false
  render = false
  overlayVisible = false
  overlayEventListener: any
  overlaySubscription!: Subscription
  selfClick = false
  scrollHandler: IConnectedOverlayScrollHandler | null = null
  target: HTMLElement | null = null

  @Input() appendTo = 'body'
  @Input() autoZIndex = true
  @Input() baseZIndex = 0
  @Input() dismissable = true
  @Input() focusOnShow = true
  @Input() hideTransitionOptions = '.1s linear'
  @Input() showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)'
  @Input() style?: Object

  @Output() onShow = new EventEmitter<null>()
  @Output() onHide = new EventEmitter<{}>()

  @ContentChildren(TemplateDirective) templates!: QueryList<any>

  constructor(
    public cd: ChangeDetectorRef,
    public config: HcConfig,
    public el: ElementRef,
    public zone: NgZone,
    public renderer: Renderer2,
    public overlayService: OverlayService
  ) {}

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template
          break

        default:
          this.contentTemplate = item.template
          break
      }

      this.cd.markForCheck()
    })
  }

  toggle(event: Event, target?: HTMLElement): void {
    if (this.isOverlayAnimationInProgress) {
      return
    }

    if (this.overlayVisible) {
      if (this.hasTargetChanged(event, target)) {
        this.destroyCallback = () => {
          this.show(null, target! || event!.currentTarget || event!.target)
        }
      }

      this.hide()
    } else {
      this.show(event, target)
    }
  }

  show(event: Event | null, target?: HTMLElement | null): void {
    if (this.isOverlayAnimationInProgress) {
      return
    }

    this.target = (target || event?.currentTarget || event?.target) as HTMLElement
    this.overlayVisible = true
    this.render = true
    this.cd.markForCheck()
  }

  hide() {
    if (this.isOverlayAnimationInProgress) {
      return
    }

    this.overlayVisible = false
    this.cd.markForCheck()
  }

  focus(): void {
    const focusable = DomHandler.findSingleElement(this.container, '[autofocus]')
    if (focusable) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => focusable.focus(), 5)
      })
    }
  }

  hasTargetChanged(event: Event, target: HTMLElement | null | undefined): boolean {
    return (
      this.target != null &&
      this.target !== (target || event.currentTarget || event.target)
    )
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'open') {
      this.container = event.element
      this.onShow.emit(null)
      this.appendContainer()
      this.align()
      this.bindDocumentClickListener()
      this.bindDocumentResizeListener()
      this.bindScrollListener()

      if (this.focusOnShow) {
        this.focus()
      }

      this.overlayEventListener = (event: any) => {
        if (this.container && this.container.contains(event.target)) {
          this.selfClick = true
        }
      }

      this.overlaySubscription = this.overlayService.clickObservable.subscribe(
        this.overlayEventListener
      )
    }

    this.isOverlayAnimationInProgress = true
  }

  onAnimationEnd(event: AnimationEvent): void {
    switch (event.toState) {
      case 'void':
        if (this.destroyCallback) {
          this.destroyCallback()
          this.destroyCallback = null
        }

        if (this.overlaySubscription) {
          this.overlaySubscription.unsubscribe()
        }
        break

      case 'close':
        if (this.autoZIndex) {
          ZIndexUtils.clear(this.container)
        }

        if (this.overlaySubscription) {
          this.overlaySubscription.unsubscribe()
        }

        this.onContainerDestroy()
        this.onHide.emit({})
        this.render = false
        break
    }

    this.isOverlayAnimationInProgress = false
  }

  appendContainer(): void {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        document.body.appendChild(this.container)
      } else {
        DomHandler.appendChild(this.container, this.appendTo)
      }
    }
  }

  align(): void {
    if (this.autoZIndex) {
      ZIndexUtils.set(
        'overlay',
        this.container,
        this.baseZIndex + this.config.zIndex.overlay
      )
    }

    if (this.target) {
      DomHandler.absolutePosition(this.container, this.target)

      const containerOffset = DomHandler.getOffset(this.container)
      const targetOffset = DomHandler.getOffset(this.target)
      let arrowLeft = 0

      if (containerOffset.left < targetOffset.left) {
        arrowLeft = targetOffset.left - containerOffset.left
      }

      this.container.style.setProperty('--overlayArrowLeft', `${arrowLeft}px`)

      if (containerOffset.top < targetOffset.top) {
        DomHandler.addClass(this.container, 'p-dropdown-panel-flipped')
      }
    }
  }

  bindDocumentClickListener(): void {
    if (!this.documentClickListener && this.dismissable) {
      this.zone.runOutsideAngular(() => {
        const documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click'
        const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document'

        this.documentClickListener = this.renderer.listen(
          documentTarget,
          documentEvent,
          (event) => {
            if (
              !this.container.contains(event.target) &&
              this.target !== event.target &&
              !this.target!.contains(event.target) &&
              !this.selfClick
            ) {
              this.zone.run(() => {
                this.hide()
              })
            }

            this.selfClick = false
            this.cd.markForCheck()
          }
        )
      })
    }
  }

  bindDocumentResizeListener(): void {
    this.documentResizeListener = this.onWindowResize.bind(this)
    if (this.documentResizeListener) {
      window.addEventListener('resize', this.documentResizeListener)
    }
  }

  onWindowResize(): void {
    if (this.overlayVisible && !DomHandler.isTouchDevice()) {
      this.hide()
    }
  }

  bindScrollListener(): void {
    if (!this.scrollHandler) {
      if (this.target) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
          if (this.overlayVisible) {
            this.hide()
          }
        })
      }
    } else {
      this.scrollHandler.bindScrollListener()
    }
  }

  onContainerDestroy(): void {
    if (!(this.cd as ViewRef).destroy) {
      this.target = null
    }

    this.unbindDocumentClickListener()
    this.unbindDocumentResizeListener()
    this.unbindScrollListener()
  }

  unbindDocumentClickListener(): void {
    if (this.documentClickListener) {
      this.documentClickListener()
      this.documentClickListener = null
      this.selfClick = false
    }
  }

  unbindDocumentResizeListener(): void {
    if (this.documentResizeListener) {
      window.removeEventListener('resize', this.documentResizeListener)
      this.documentResizeListener = null
    }
  }

  unbindScrollListener() {
    if (this.scrollHandler) {
      this.scrollHandler.unbindScrollListener()
    }
  }

  restoreAppend(): void {
    if (this.container && this.appendTo) {
      this.el.nativeElement.appendChild(this.container)
    }
  }

  onOverlayClick(event: IMessage): void {
    this.overlayService.add({
      originalEvent: event,
      target: this.el.nativeElement,
    })

    this.selfClick = true
  }

  ngOnDestroy(): void {
    if (this.scrollHandler) {
      this.scrollHandler.destroy()
      this.scrollHandler = null
    }

    if (this.container && this.autoZIndex) {
      ZIndexUtils.clear(this.container)
    }

    if (!(this.cd as ViewRef).destroyed) {
      this.target = null
    }

    this.destroyCallback = null
    if (this.container) {
      this.restoreAppend()
      this.onContainerDestroy()
    }

    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe()
    }
  }
}
