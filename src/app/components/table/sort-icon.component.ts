import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'

import { SortDirective } from './sort.directive'
import { Subscription } from 'rxjs'
import { TableService } from './table.service'

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

  constructor(
    public tableService: TableService,
    public cd: ChangeDetectorRef,
    public sort: SortDirective
  ) {
    this.subscription = this.tableService.sortSource$.subscribe(() => {
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
    this.sortOrder = this.sort.isSorted(this.field) ? this.sort.sortOrder : 0

    this.cd.markForCheck()
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
