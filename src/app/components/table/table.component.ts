/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'

import { DataDirective } from './data.directive'
import { PaginationDirective } from './pagination.directive'
import { TableService } from './table.service'
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
    <table [ngClass]="{ 'responsive': responsive }" *ngIf="data.value">
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
          <tr *ngFor="let item of data.value" data-testid="row-patient">
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
    <div style="margin-top: 20px" *ngIf="paginator.paginator">
      <hc-pagination
        [rows]="paginator.rows"
        [pagination]="paginator.pagination"
        [totalRecords]="paginator.totalRecords"
        (pageChangeEvent)="paginator.onPageChange($event)"
        [showCurrentPageReport]="paginator.showCurrentPageReport"
        [currentPageReportTemplate]="paginator.currentPageReportTemplate"
      ></hc-pagination>
    </div>
  `,
  styleUrls: ['table.component.scss'],
  providers: [TableService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent implements AfterContentInit {
  bodyTemplate!: TemplateRef<any>
  headerTemplate!: TemplateRef<any>
  captionTemplate!: TemplateRef<any>
  summaryTemplate!: TemplateRef<any>

  @Input() columns: IColumn[] = []
  @Input() responsive = false

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  constructor(
    public tableService: TableService,
    public data: DataDirective,
    public paginator: PaginationDirective
  ) {}

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
}
