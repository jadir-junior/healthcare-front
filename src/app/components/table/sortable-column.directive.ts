/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core'

import { Subscription } from 'rxjs'
import { TableComponent } from './table.component'

@Directive({
  selector: '[hcSortableColumn]',
  host: {
    'class': 'hc-sortable-column',
    '[class.hc-highlight]': 'sorted',
    '[attr.tabindex]': '0',
    '[attr.role]': '"columnheader"',
    '[attr.aria-sort]': 'sortOrder',
  },
})
export class SortableColumnDirective implements OnInit, OnDestroy {
  @Input('hcSortableColumn') field!: string

  sorted!: boolean
  sortOrder!: string
  subscription: Subscription

  constructor(public dt: TableComponent) {
    this.subscription = this.dt.tableService.sortSource$.subscribe(() => {
      this.updateSortState()
    })
  }

  ngOnInit(): void {
    this.updateSortState()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.updateSortState()
    this.dt.sort({ field: this.field })
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKey() {
    this.onClick()
  }

  updateSortState() {
    this.sorted = this.dt.isSorted(this.field)
    if (this.sorted) {
      this.sortOrder = this.dt.sortOrder === 1 ? 'ascending' : 'descending'
    } else {
      this.sortOrder = 'none'
    }
  }
}
