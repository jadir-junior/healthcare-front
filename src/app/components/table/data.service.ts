/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { PaginationDirective } from './pagination.directive'

@Injectable()
export class DataService {
  public value: any[] = []

  get processedData() {
    return this.value || []
  }

  constructor(public pagination: PaginationDirective) {}

  dataToRender(data: any) {
    const _data = data || this.processedData

    if (_data && this.pagination.paginator) {
      const first = this.pagination.first
      return _data.slice(first, first + this.pagination.rows)
    }

    return _data
  }
}
