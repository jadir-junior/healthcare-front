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
  _sortOrder = 1
  _sortField!: string

  @Input() defaultSortOrder = 1

  @Output() sortEvent = new EventEmitter<ISortMeta>()

  @Input() get sortField(): string {
    return this._sortField
  }

  set sortField(val: string) {
    this._sortField = val
  }

  @Input() get sortOrder(): number {
    return this._sortOrder
  }

  set sortOrder(val: number) {
    this._sortOrder = val
  }

  constructor(private tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortOrder']) {
      this._sortOrder = changes['sortOrder'].currentValue
    }

    if (changes['sortField']) {
      this._sortField = changes['sortField'].currentValue
    }
  }

  isSorted(field: string) {
    return this.sortField && this.sortField === field ? true : false
  }

  sort(event: { field: string }) {
    this.sortOrder =
      this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder
    this._sortField = event.field

    this.sortSingle()
  }

  sortSingle() {
    const field = this.sortField
    const order = this.sortOrder

    const sortMeta: ISortMeta = {
      field,
      order,
    }

    this.sortEvent.emit(sortMeta)
    this.tableService.onSort(sortMeta)
  }
}
