import { ActivatedRoute, Router } from '@angular/router'

import { IColumn } from './../../components/table/table.component'
import { IPageChange } from 'src/app/components/pagination/pagination.component'
import { Injectable } from '@angular/core'

interface IParams {
  page: string
  limit: string
  sortColumn: string
  sortDirection: string
}

@Injectable()
export class BaseTableService {
  page = 1
  limit = 5
  sortColumn: string | undefined = undefined
  sortDirection: string | undefined = undefined
  cols: IColumn[] = []
  _selectedColumns: IColumn[] = []

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        const { page, limit, sortColumn, sortDirection } = params as IParams

        this.page = page ? Number(page) : 1
        this.limit = limit ? Number(limit) : 5
        this.sortColumn = sortColumn
        this.sortDirection = sortDirection
      }
    })
  }

  get selectedColumns(): IColumn[] {
    return this._selectedColumns
  }

  set selectedColumns(val: IColumn[]) {
    this._selectedColumns = this.cols.filter((col) => val.includes(col))
  }

  sort(event: { field: string; order: number }) {
    this.sortColumn = event.field
    this.sortDirection = event.order === 1 ? 'ASC' : 'DESC'
  }

  changePage(pageChange: IPageChange) {
    this.page = pageChange.page
    this.changeUrlParams()
  }

  changeLimit(limit: number) {
    this.limit = limit
    this.changeUrlParams()
  }

  private changeUrlParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page,
        limit: this.limit,
        sortColumn: this.sortColumn,
        sortDirection: this.sortDirection,
      },
      replaceUrl: true,
    })
  }
}
