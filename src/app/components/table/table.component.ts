/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'

import { IColumnSorted } from './sort-header.component'
import { TableBaseService } from './table-base.service'
import { TemplateDirective } from 'src/app/directives/template/template.directive'

export interface IColumn {
  header: string
  field: string
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
            <!-- [sortColumns]="sort"
              [sortableColumn]="th.sortableColumn"
              [hc-sort-header]="th.data"
              [initialValueSortColumn]="{
                sortColumn: tableBaseService.sortColumn,
                sortDirection: tableBaseService.sortDirection
              }"
              (sortHeaderEvent)="onSortHeader($event)" -->
            <th *ngFor="let th of columns">
              {{ th.header }}
            </th>
          </tr>
        </ng-template>
        <ng-container
          *ngTemplateOutlet="headerTemplate ? headerTemplate : headerDynamic"
        ></ng-container>
      </thead>
      <tbody *ngIf="bodyTemplate || columns">
        <ng-template #bodyDynamic>
          <tr *ngFor="let item of value" data-testid="row-patient">
            <td *ngIf="checkbox">
              <input
                #checkbox
                type="checkbox"
                [attr.aria-label]="'checkbox-' + item['id']"
                (change)="selectRow(item, checkbox.checked)"
                [checked]="item?.checked"
              />
            </td>
            <td *ngFor="let td of columns">
              {{ item[td.field] }}
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
export class TableComponent<T> implements AfterContentInit {
  bodyTemplate!: TemplateRef<any>
  headerTemplate!: TemplateRef<any>

  @Input() sort = false
  @Input() columns: IColumn[] = []
  @Input() checkbox = false
  @Input() responsive = false
  @Input() value: any[] = []

  @Output() sortColumnEvent = new EventEmitter<IColumnSorted>()

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  constructor(public tableBaseService: TableBaseService<T>) {}

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
