import { Directive, EventEmitter, Input, Output } from '@angular/core'
import { IPageChange, IPagination } from '../pagination/pagination.component'

@Directive({
  selector: '[hcPagination]',
})
export class PaginationDirective {
  _first = 0

  @Input() paginator!: boolean
  @Input() rows!: number
  @Input() pagination!: IPagination
  @Input() totalRecords!: number
  @Input() showCurrentPageReport!: boolean
  @Input() currentPageReportTemplate = '{currentPage} of {totalPages}'

  @Output() pageEvent = new EventEmitter<IPageChange>()

  get first(): number {
    return this._first
  }

  set first(val: number) {
    this._first = val
  }

  onPageChange(event: IPageChange) {
    this.pageEvent.emit(event)
  }
}
