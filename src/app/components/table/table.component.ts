/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'
import { ISortMeta, TableService } from './table.service'

import { IPageChange } from '../pagination/pagination.component'
import { TemplateDirective } from 'src/app/directives/template/template.directive'

export interface IColumn {
  header: string
  field: string
}

@Component({
  selector: 'hc-table',
  template: `
    <div class="hc-datatable-header" *ngIf="captionTemplate">
      <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
    </div>
    <table [ngClass]="{ 'responsive': responsive }" *ngIf="value">
      <thead *ngIf="headerTemplate || columns">
        <ng-template #headerDynamic>
          <tr>
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
            <td *ngFor="let td of columns">
              {{ item[td.field] }}
            </td>
          </tr>
        </ng-template>
        <ng-container *ngTemplateOutlet="bodyTemplate ? bodyTemplate : bodyDynamic">
        </ng-container>
      </tbody>
    </table>
    <div class="hc-datatable-footer" *ngIf="summaryTemplate">
      <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
    </div>
    <div style="margin-top: 20px" *ngIf="paginator">
      <hc-pagination
        [rows]="rows"
        [totalRecords]="totalRecords"
        (pageChangeEvent)="pageChangeEvent.emit($event)"
        [showCurrentPageReport]="showCurrentPageReport"
        [currentPageReportTemplate]="currentPageReportTemplate"
      ></hc-pagination>
    </div>
  `,
  styleUrls: ['table.component.scss'],
  providers: [TableService],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnChanges, AfterContentInit {
  _sortOrder = 1
  _sortField!: string

  bodyTemplate!: TemplateRef<any>
  headerTemplate!: TemplateRef<any>
  captionTemplate!: TemplateRef<any>
  summaryTemplate!: TemplateRef<any>

  @Input() columns: IColumn[] = []

  @Input() responsive = false

  @Input() value: any[] = []

  @Input() defaultSortOrder = 1

  // paginator
  @Input() paginator!: boolean
  @Input() rows!: number
  @Input() totalRecords!: number
  @Input() showCurrentPageReport!: boolean
  @Input() currentPageReportTemplate = '{currentPage} of {totalPages}'
  @Output() pageChangeEvent = new EventEmitter<IPageChange>()

  @Output() sortEvent = new EventEmitter<ISortMeta>()

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  constructor(public tableService: TableService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sortOrder']) {
      this._sortOrder = changes['sortOrder'].currentValue
    }

    if (changes['sortField']) {
      this._sortField = changes['sortField'].currentValue
    }
  }

  @Input() get sortField(): string {
    return this._sortField
  }

  set sortField(val: string) {
    this._sortField = val
  }

  @Input() get sortOrder(): number {
    return this._sortOrder
  }

  set sortOrder(val: number) {
    this._sortOrder = val
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
        case 'caption':
          this.captionTemplate = item.template
          break
        case 'summary':
          this.summaryTemplate = item.template
          break
      }
    })
  }

  isSorted(field: string) {
    return this.sortField && this.sortField === field ? true : false
  }

  sort(event: { field: string }) {
    this._sortOrder =
      this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder
    this._sortField = event.field

    this.sortSingle()
  }

  sortSingle() {
    const field = this.sortField
    const order = this.sortOrder

    const sortMeta: ISortMeta = {
      field,
      order,
    }

    this.sortEvent.emit(sortMeta)
    this.tableService.onSort(sortMeta)
  }
}
