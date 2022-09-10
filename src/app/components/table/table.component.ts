/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'

export interface IHcDtColumns {
  title: string
  data: string
  textColor?: string
}

export interface IHcDtOptions {
  ajax: any
  columns: IHcDtColumns[]
}

@Component({
  selector: 'hc-table',
  template: `
    <table>
      <ng-content select="[hcHeader]"></ng-content>
      <ng-content select="[hcBody]"></ng-content>
      <thead *ngIf="thead">
        <tr>
          <th *ngFor="let th of thead">{{ th }}</th>
        </tr>
      </thead>
      <tbody *ngIf="tbody">
        <tr *ngFor="let item of ajax">
          <td *ngFor="let td of tbody" [ngStyle]="{ 'color': td.textColor }">
            {{ item[td.data] }}
          </td>
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
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TableComponent implements OnInit {
  thead?: Array<string>
  tbody?: Array<{ data: string; textColor: string | undefined }>
  ajax?: Array<any>

  @Input() hcDtOptions?: IHcDtOptions

  ngOnInit(): void {
    this.thead = this.hcDtOptions?.columns.map((c) => c.title)
    this.tbody = this.hcDtOptions?.columns.map((c) => ({
      data: c.data,
      textColor: c.textColor,
    }))
    this.ajax = this.hcDtOptions?.ajax
  }
}
