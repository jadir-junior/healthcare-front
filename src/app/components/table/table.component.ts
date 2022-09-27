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
import { IStyle } from './../../common/models/style.model'
import { PaginationDirective } from './pagination.directive'
import { TemplateDirective } from 'src/app/directives/template/template.directive'

export interface IColumn {
  header: string
  field: string
}

@Component({
  selector: 'hc-table',
  template: `
    <div
      *ngIf="paginator.paginator"
      class="hc-table-options-header"
      style="margin-bottom: 1rem;"
    >
      <div class="hc-table-limit">
        <ng-select
          style="width: 80px;"
          [searchable]="false"
          [items]="paginator.rowsPerPageOptions"
          [clearable]="false"
          [(ngModel)]="paginator.selectedLimit"
          (change)="paginator.onLimitChange.emit($event)"
        ></ng-select>
        <span style="margin-left: 0.5rem">{{ paginator.limitLabel }}</span>
      </div>
      <div *ngIf="optionsHeaderTemplate">
        <ng-container *ngTemplateOutlet="optionsHeaderTemplate"></ng-container>
      </div>
    </div>
    <div class="hc-datatable-header" *ngIf="captionTemplate">
      <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
    </div>
    <table [ngClass]="{ 'responsive': responsive }" *ngIf="data.value" [ngStyle]="style">
      <thead *ngIf="headerTemplate">
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </thead>
      <tbody *ngIf="bodyTemplate">
        <ng-container *ngTemplateOutlet="bodyTemplate"></ng-container>
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent implements AfterContentInit {
  bodyTemplate!: TemplateRef<TemplateDirective>
  headerTemplate!: TemplateRef<TemplateDirective>
  captionTemplate!: TemplateRef<TemplateDirective>
  summaryTemplate!: TemplateRef<TemplateDirective>
  optionsHeaderTemplate!: TemplateRef<TemplateDirective>

  @Input() columns: IColumn[] = []
  @Input() responsive = false
  @Input() style?: IStyle

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  constructor(public data: DataDirective, public paginator: PaginationDirective) {}

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
        case 'optionsHeader':
          this.optionsHeaderTemplate = item.template
      }
    })
  }
}
