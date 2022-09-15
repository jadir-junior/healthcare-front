import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

export interface ISortMeta {
  field: string
  order: number
}

@Injectable()
export class TableService {
  private sortSource = new Subject<ISortMeta | ISortMeta[]>()

  sortSource$ = this.sortSource.asObservable()

  onSort(sortMeta: ISortMeta | ISortMeta[]) {
    this.sortSource.next(sortMeta)
  }
}
