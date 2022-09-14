/* eslint-disable @typescript-eslint/no-explicit-any */
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
export class TableBaseService<T> {
  page = 1
  limit = 15
  sortDirection?: 'ASC' | 'DESC'
  sortColumn?: string
  items: T[] | any = []
  selecteds: T[] = []

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

  onSelectedOrUnSelected(item: T | any, isAdd: boolean, prop: string = 'id'): void {
    if (isAdd) {
      this.selecteds = [...this.selecteds, item]
    } else {
      this.selecteds = this.selecteds.filter((t: T | any) => t[prop] !== item[prop])
    }
  }

  onSelectedAllOrUnSelectedAll(isAll: boolean): void {
    if (isAll) {
      this.items = this.mapperChecked(this.items, isAll)
      this.selecteds = this.items
    } else {
      this.items = this.mapperChecked(this.items, isAll)
      this.selecteds = []
    }
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

  mapperChecked(items: T[] | T, checked: boolean): T[] | T {
    if (Array.isArray(items)) {
      return items.map((t) => ({ ...t, checked: checked }))
    } else {
      return { ...items, checked: checked }
    }
  }
}
