import { Directive, HostListener, Input } from '@angular/core'

import { RowExpandDirective } from './row-expand.directive'

@Directive({
  selector: '[hcRowToggler]',
})
export class RowTogglerDirective<T> {
  @Input('hcRowToggler') data!: T

  constructor(public rowExpand: RowExpandDirective<T>) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.rowExpand.toggleRow(this.data, event)
    event.preventDefault()
  }
}
