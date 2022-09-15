/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { IColumnSorted } from './sort-header.component'
import { TableBaseService } from './table-base.service'

export interface IHcDtColumns {
  title: string
  data: string
  textColor?: string
}

export interface IHcDtOptions {
  columns: IHcDtColumns[]
}

@Component({
  selector: 'hc-table',
  template: `
    <table>
      <ng-content select="[hcHeader]"></ng-content>
      <ng-content select="[hcBody]"></ng-content>
      <thead *ngIf="columns">
        <tr>
          <th *ngIf="checkbox">
            <input
              #checkbox
              type="checkbox"
              aria-label="checkboxAll"
              (change)="selectAll(checkbox.checked)"
            />
          </th>
          <th
            *ngFor="let th of columns"
            [hc-sort-header]="th.data"
            [initialValueSortColumn]="{
              sortColumn: tableBaseService.sortColumn,
              sortDirection: tableBaseService.sortDirection
            }"
            (sortHeaderEvent)="onSortHeader($event)"
          >
            {{ th.title }}
          </th>
        </tr>
      </thead>
      <tbody *ngIf="tbody">
        <tr *ngFor="let item of tableBaseService.items" data-testid="row-patient">
          <td *ngIf="checkbox">
            <input
              #checkbox
              type="checkbox"
              [attr.aria-label]="'checkbox-' + item['id']"
              (change)="selectRow(item, checkbox.checked)"
              [checked]="item?.checked"
            />
          </td>
          <td *ngFor="let td of tbody" [ngStyle]="{ 'color': td.textColor }">
            {{ item[td.data] }}
          </td>
        </tr>
      </tbody>
    </table>
    <button (click)="onSubmit()" aria-label="submit">submit</button>
  `,
  styles: [
    `
      table {
        border-spacing: 0;
      }

      th {
        padding: 16px;
        font-size: 14px;
        background-color: var(--neutral-divider);
        text-align: left;
      }

      td {
        padding: 16px;
        text-align: left;
        font-size: 14px;
        border-bottom: 1px solid var(--neutral-divider);
        background-color: var(--neutral-white);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> implements OnInit {
  columns?: IHcDtColumns[]
  tbody?: Array<{ data: string; textColor: string | undefined }>

  @Input() hcDtOptions?: IHcDtOptions
  @Input() checkbox = false
  @Output() sortColumnEvent = new EventEmitter<IColumnSorted>()

  constructor(public tableBaseService: TableBaseService<T>) {}

  ngOnInit(): void {
    this.columns = this.hcDtOptions?.columns
    this.tbody = this.hcDtOptions?.columns.map((c) => ({
      data: c.data,
      textColor: c.textColor,
    }))
  }

  onSortHeader(sorted: IColumnSorted): void {
    this.sortColumnEvent.emit(sorted)
  }

  selectRow(item: T, isAdd: boolean): void {
    this.tableBaseService.onSelectedOrUnSelected(item, isAdd)
  }

  selectAll(isAll: boolean): void {
    this.tableBaseService.onSelectedAllOrUnSelectedAll(isAll)
  }

  onSubmit() {
    console.log(this.tableBaseService.selecteds)
  }
}
