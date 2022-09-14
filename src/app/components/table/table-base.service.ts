import { ActivatedRoute, Router } from '@angular/router'

import { IColumnSorted } from './sort-header.component'
import { Injectable } from '@angular/core'

export interface IBaseParams {
  page: number
  limit: number
  sortDirection: string
  sortColumn: string
}

@Injectable()
export class TableBaseService {
  page = 1
  limit = 15
  sortDirection?: 'ASC' | 'DESC'
  sortColumn?: string

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        const { page, limit, sortColumn, sortDirection } = params as IBaseParams
        this.page = page
        this.limit = limit
        this.sortColumn = sortColumn
        this.sortDirection = sortDirection as 'ASC' | 'DESC'
      }
    })
  }

  sort({ sortColumn, sortDirection }: IColumnSorted): void {
    this.sortColumn = sortColumn
    this.sortDirection = sortDirection
    this.changeQueryParamsUrl()
  }

  private changeQueryParamsUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: this.page,
        limit: this.limit,
        sortDirection: this.sortDirection,
        sortColumn: this.sortColumn,
      },
      replaceUrl: true,
    })
  }
}
