import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'
import { ISortMeta, TableService } from './table.service'

@Directive({
  selector: '[hcSort]',
})
export class SortDirective implements OnChanges {
  _sortOrder: number | string | undefined = 1
  _sortField: string | undefined

  @Input() defaultSortOrder = 1

  @Output() sortEvent = new EventEmitter<ISortMeta>()

  @Input() get sortField(): string | undefined {
    return this._sortField
  }

  set sortField(val: string | undefined) {
    this._sortField = val
  }

  @Input() get sortOrder(): number | string | undefined {
    return this._sortOrder
  }

  set sortOrder(val: number | string | undefined) {
    this._sortOrder = val
  }

  constructor(private tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortOrder']) {
      if (typeof changes['sortOrder'].currentValue === 'string') {
        this.sortOrder = changes['sortOrder'].currentValue === 'ASC' ? 1 : -1
        return
      }

      this.sortOrder = changes['sortOrder'].currentValue
    }

    if (changes['sortField']) {
      this.sortField = changes['sortField'].currentValue
    }
  }

  isSorted(field: string) {
    return this.sortField && this.sortField === field ? true : false
  }

  sort(event: { field: string }) {
    this.sortOrder =
      this.sortField === event.field
        ? (this.sortOrder as number) * -1
        : this.defaultSortOrder
    this.sortField = event.field

    this.sortSingle()
  }

  sortSingle() {
    if (this.sortOrder && this.sortField) {
      const field = this.sortField
      const order = this.sortOrder as number

      const sortMeta: ISortMeta = {
        field,
        order,
      }

      this.sortEvent.emit(sortMeta)
      this.tableService.onSort(sortMeta)
    }
  }
}
