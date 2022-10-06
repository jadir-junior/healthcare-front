import { Directive, EventEmitter, Input, Output } from '@angular/core'

import { ObjectUtils } from './../../common/object-utils/object-utils'

@Directive({
  selector: '[hcRowExpand]',
})
export class RowExpandDirective<T> {
  @Input() dataKey?: string
  @Input() expandedRowKeys: { [s: string]: boolean } = {}

  @Output() onRowCollapse = new EventEmitter<{ originalEvent: Event; data: T }>()
  @Output() onRowExpand = new EventEmitter<{ originalEvent: Event; data: T }>()

  isRowExpanded(rowData: T): boolean {
    return (
      this.expandedRowKeys[
        String(ObjectUtils.resolveFieldData(rowData, this.dataKey))
      ] === true
    )
  }

  toggleRow(rowData: T, event: Event): void {
    if (!this.dataKey) {
      throw new Error(`dataKey must be defined to use row expansion`)
    }

    const dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey))

    if (this.expandedRowKeys[dataKeyValue] !== undefined) {
      delete this.expandedRowKeys[dataKeyValue]
      this.onRowCollapse.emit({
        originalEvent: event,
        data: rowData,
      })
    } else {
      this.expandedRowKeys[dataKeyValue] = true
      this.onRowExpand.emit({
        originalEvent: event,
        data: rowData,
      })
    }

    event.preventDefault()
  }
}
