import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { IPageChange, IPagination } from '../pagination/pagination.component'

@Directive({
  selector: '[hcPagination]',
})
export class PaginationDirective implements OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pagination'].currentValue) {
      this.rows = changes['pagination'].currentValue.itemsPerPage
      this.totalRecords = changes['pagination'].currentValue.totalItems
    }
  }

  onPageChange(event: IPageChange) {
    this.pageEvent.emit(event)
  }
}
