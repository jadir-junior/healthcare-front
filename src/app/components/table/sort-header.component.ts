import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core'

export interface IColumnSorted {
  sortColumn: string | undefined
  sortDirection: 'ASC' | 'DESC' | undefined
}

@Component({
  selector: '[hc-sort-header]',
  template: `
    <div class="wrapper-th">
      <ng-content></ng-content>
      <div class="wrapper-sort">
        <div
          *ngIf="sortDirection === undefined"
          class="material-symbols-outlined icon-sort icon-null"
        >
          expand_more
        </div>
        <div *ngIf="sortDirection === 'ASC'" class="material-symbols-outlined icon-sort">
          expand_more
        </div>
        <div *ngIf="sortDirection === 'DESC'" class="material-symbols-outlined icon-sort">
          expand_less
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper-th {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .icon-sort {
        margin-top: 4px;
      }

      .icon-null {
        opacity: 0.3;
      }
    `,
  ],
})
export class SortHeaderComponent implements OnInit, OnChanges {
  @Input('hc-sort-header') sortHeader!: string
  @Input() initialValueSortColumn: IColumnSorted | undefined = undefined
  @Output() sortHeaderEvent = new EventEmitter<IColumnSorted>()

  sortDirection: 'ASC' | 'DESC' | undefined = undefined

  ngOnInit(): void {
    if (this.sortHeader === this.initialValueSortColumn?.sortColumn) {
      this.sortDirection = this.initialValueSortColumn.sortDirection
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['initialValueSortColumn'].currentValue?.['sortColumn'] !==
      changes['initialValueSortColumn'].previousValue?.['sortColumn']
    ) {
      if (
        this.sortHeader !== changes['initialValueSortColumn'].currentValue['sortColumn']
      ) {
        this.sortDirection = undefined
      }
    }
  }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC'
    this.sortHeaderEvent.emit({
      sortColumn: this.sortHeader,
      sortDirection: this.sortDirection,
    })
  }
}
