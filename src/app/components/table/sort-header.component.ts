import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'

export interface IColumnSorted {
  sortColumn: string
  sortDirection: 'ASC' | 'DESC'
}

@Component({
  selector: '[hc-sort-header]',
  template: `
    <div class="wrapper-th">
      <ng-content></ng-content>
      <div class="wrapper-sort">
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
    `,
  ],
})
export class SortHeaderComponent {
  @Input('hc-sort-header') sortHeader!: string
  @Output() sortHeaderEvent = new EventEmitter<IColumnSorted>()

  sortDirection!: 'ASC' | 'DESC'

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC'
    this.sortHeaderEvent.emit({
      sortColumn: this.sortHeader,
      sortDirection: this.sortDirection,
    })
  }
}
