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

  sortSource$ = this.sortSource.asObservable()
  selectionSource$ = this.selectionSource.asObservable()

  onSort(sortMeta: ISortMeta | ISortMeta[]) {
    this.sortSource.next(sortMeta)
  }

  onSelectionChange() {
    this.selectionSource.next(null)
  }
}
