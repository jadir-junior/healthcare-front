import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'

import { Subscription } from 'rxjs'
import { TableComponent } from './table.component'

@Component({
  selector: 'hc-sort-icon',
  template: `
    <i class="material-symbols-outlined">
      {{ getIconState() }}
    </i>
  `,
  styles: [
    `
      i {
        font-size: 18px;
        position: absolute;
        margin-left: 6px;
      }
    `,
  ],
})
export class SortIconComponent implements OnInit, OnDestroy {
  @Input() field!: string

  subscription: Subscription

  sortOrder!: number

  constructor(public dt: TableComponent, public cd: ChangeDetectorRef) {
    this.subscription = this.dt.tableService.sortSource$.subscribe(() => {
      this.updateSortState()
    })
  }

  ngOnInit(): void {
    this.updateSortState()
  }

  getIconState(): string {
    switch (this.sortOrder) {
      case 1:
        return 'vertical_align_top'
      case -1:
        return 'vertical_align_bottom'
      default:
        return 'height'
    }
  }

  updateSortState() {
    this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0

    this.cd.markForCheck()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
