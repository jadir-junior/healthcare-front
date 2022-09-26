import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core'

import { DomHandler } from './../../common/dom-handler/dom-handler'
import { uniqueId } from '../../utils/unique-id/unique-id'

@Directive({
  selector: '[hcBadge]',
})
export class BadgeDirective implements AfterViewInit, OnDestroy {
  private _value!: string
  private _id!: string

  initialized = false

  @Input() severity!: string

  @Input() get value(): string {
    return this._value
  }

  set value(val: string) {
    if (val !== this._value) {
      this._value = val

      if (this.initialized) {
        const badge = document.getElementById(this._id)

        if (this._value && badge) {
          if (DomHandler.hasClass(badge, 'hc-badge-dot')) {
            DomHandler.removeClass(badge, 'hc-badge-dot')
          }

          if (String(this._value).length === 1) {
            DomHandler.addClass(badge, 'hc-badge-no-gutter')
          } else {
            DomHandler.removeClass(badge, 'hc-badge-no-gutter')
          }
        } else if (!this._value && badge && !DomHandler.hasClass(badge, 'p-badge-dot')) {
          DomHandler.addClass(badge, 'hc-badge-dot')
        }

        if (badge) {
          badge.innerHTML = ''
          badge.appendChild(document.createTextNode(this._value))
        }
      }
    }
  }

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const { nativeElement } = this.el
    this._id = uniqueId() + '_badge'

    const el =
      nativeElement.nodeName.indexOf('-') !== -1
        ? nativeElement.firstChild
        : nativeElement

    const badge = document.createElement('span')
    badge.id = this._id
    badge.className = 'hc-badge'

    if (this.severity) {
      DomHandler.addClass(badge, 'hc-badge-' + this.severity)
    } else {
      DomHandler.addClass(badge, 'hc-badge-danger')
    }

    if (this.value != null) {
      badge.appendChild(document.createTextNode(this.value))

      if (String(this.value).length === 1) {
        DomHandler.addClass(badge, 'hc-badge-no-gutter')
      }
    } else {
      DomHandler.addClass(badge, 'hc-badge-dot')
    }

    DomHandler.addClass(el, 'hc-overlay-badge')
    el.appendChild(badge)

    this.initialized = true
  }

  ngOnDestroy(): void {
    this.initialized = false
  }
}
