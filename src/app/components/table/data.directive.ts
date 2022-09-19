/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core'

import { PaginationDirective } from './pagination.directive'
import { TableService } from './table.service'

@Directive({
  selector: '[hcData]',
})
export class DataDirective implements OnChanges {
  private _value: any[] = []

  @Input() get value(): any[] {
    return this._value
  }

  set value(val: any[]) {
    this._value = val
  }

  get processedData() {
    return this.value || []
  }

  constructor(
    public paginator: PaginationDirective,
    private tableService: TableService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue

      this.tableService.onValueChange(changes['value'].currentValue)
    }
  }

  dataToRender(data: any) {
    const _data = data || this.processedData

    if (_data && this.paginator.paginator) {
      const first = this.paginator.first
      return _data.slice(first, first + this.paginator.rows)
    }

    return _data
  }
}
