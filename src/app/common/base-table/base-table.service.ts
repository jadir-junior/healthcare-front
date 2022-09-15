import { ActivatedRoute } from '@angular/router'
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
  limit = 10
  sortColumn: string | undefined = undefined
  sortDirection: string | undefined = undefined

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length !== 0) {
        const { page, limit, sortColumn, sortDirection } = params as IParams

        this.page = Number(page)
        this.limit = Number(limit)
        this.sortColumn = sortColumn
        this.sortDirection = sortDirection
      }
    })
  }

  sort(event: { field: string; order: number }) {
    this.sortColumn = event.field
    this.sortDirection = event.order === 1 ? 'ASC' : 'DESC'
  }
}
