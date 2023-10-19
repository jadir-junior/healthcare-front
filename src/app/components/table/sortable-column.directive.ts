/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core'

import { SortDirective } from './sort.directive'
import { Subscription } from 'rxjs'
import { TableService } from './table.service'

@Directive({
  selector: '[hcSortableColumn]',
  host: {
    'class': 'hc-sortable-column',
    '[class.hc-datatable-highlight]': 'sorted',
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

  constructor(
    private tableService: TableService,
    public sort: SortDirective
  ) {
    this.subscription = this.tableService.sortSource$.subscribe(() => {
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
    this.sort.sort({ field: this.field })
  }

  @HostListener('keydown.enter', ['$event'])
  onEnterKey() {
    this.onClick()
  }

  updateSortState() {
    this.sorted = this.sort.isSorted(this.field)
    if (this.sorted) {
      this.sortOrder = this.sort.sortOrder === 1 ? 'ascending' : 'descending'
    } else {
      this.sortOrder = 'none'
    }
  }
}
