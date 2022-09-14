/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { IColumnSorted } from './sort-header.component'

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
          <th
            *ngFor="let th of columns"
            [hc-sort-header]="th.data"
            (sortHeaderEvent)="onSortHeader($event)"
          >
            {{ th.title }}
          </th>
        </tr>
      </thead>
      <tbody *ngIf="tbody">
        <tr *ngFor="let item of items">
          <td
            *ngFor="let td of tbody"
            [ngStyle]="{ 'color': td.textColor }"
            [injectHTML]="item[td.data]"
          ></td>
        </tr>
      </tbody>
    </table>
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
  @Input() items: T[] | any = []
  @Output() sortColumnEvent = new EventEmitter<IColumnSorted>()

  constructor(private injector: Injector) {}

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
}
