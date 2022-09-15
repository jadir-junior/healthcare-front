/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'

import { IColumnSorted } from './sort-header.component'
import { TableBaseService } from './table-base.service'
import { TemplateDirective } from 'src/app/directives/template/template.directive'

export interface IHcDtColumns {
  title: string
  data: string
  textColor?: string
  sortableColumn?: string
}

export interface IHcDtOptions {
  columns: IHcDtColumns[]
}

@Component({
  selector: 'hc-table',
  template: `
    <table [ngClass]="{ 'responsive': responsive }" *ngIf="value">
      <thead *ngIf="headerTemplate || columns">
        <ng-template #headerDynamic>
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
              [sortColumns]="sort"
              [sortableColumn]="th.sortableColumn"
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
        </ng-template>
        <ng-container
          *ngTemplateOutlet="headerTemplate ? headerTemplate : headerDynamic"
        ></ng-container>
      </thead>
      <tbody *ngIf="bodyTemplate || tbody">
        <ng-template #bodyDynamic>
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
        </ng-template>
        <ng-container [ngTemplateOutlet]="bodyTemplate ? bodyTemplate : bodyDynamic">
        </ng-container>
      </tbody>
    </table>
  `,
  styleUrls: ['table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> implements OnInit, AfterContentInit {
  bodyTemplate!: TemplateRef<any>
  headerTemplate!: TemplateRef<any>

  columns?: IHcDtColumns[]
  tbody?: Array<{ data: string; textColor: string | undefined }>

  @Input() sort = false
  @Input() hcDtOptions?: IHcDtOptions
  @Input() checkbox = false
  @Input() responsive = false
  @Input() value: T[] = []

  @Output() sortColumnEvent = new EventEmitter<IColumnSorted>()

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  constructor(public tableBaseService: TableBaseService<T>) {}

  ngOnInit(): void {
    console.log(this.value)
    this.columns = this.hcDtOptions?.columns
    this.tbody = this.hcDtOptions?.columns.map((c) => ({
      data: c.data,
      textColor: c.textColor,
    }))
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'body':
          this.bodyTemplate = item.template
          break
        case 'header':
          this.headerTemplate = item.template
          break
      }
    })
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
}
