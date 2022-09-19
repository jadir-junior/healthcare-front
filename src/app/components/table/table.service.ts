/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export interface ISortMeta {
  field: string
  order: number
}

@Injectable()
export class TableService {
  private sortSource = new Subject<ISortMeta | ISortMeta[]>()
  private selectionSource = new Subject()
  private valueSource = new Subject<any>()

  sortSource$ = this.sortSource.asObservable()
  selectionSource$ = this.selectionSource.asObservable()
  valueSource$ = this.valueSource.asObservable()

  onSort(sortMeta: ISortMeta | ISortMeta[]) {
    this.sortSource.next(sortMeta)
  }

  onSelectionChange() {
    this.selectionSource.next(null)
  }

  onValueChange(value: any) {
    this.valueSource.next(value)
  }
}
