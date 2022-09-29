/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  Optional,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'

import { ElementRef } from '@angular/core'
import { IStyle } from './../../common/models/style.model'
import { PaginationDirective } from './pagination.directive'
import { TemplateDirective } from 'src/app/directives/template/template.directive'
import { DataService } from './data.service'
import { TableService } from 'src/app/components/table/table.service'
import { SimpleChanges } from '@angular/core'

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
    <ng-container>
      <ng-container
        *ngTemplateOutlet="
          buildInTable;
          context: { $implicit: data.processedData, options: { columns } }
        "
      ></ng-container>
    </ng-container>
    <ng-template #buildInTable let-items let-options="options">
      <table
        *ngIf="data.value"
        #table
        role="table"
        [ngClass]="{ 'responsive': responsive }"
        [ngStyle]="style"
      >
        <thead *ngIf="headerTemplate">
          <ng-container
            *ngTemplateOutlet="headerTemplate; context: { $implicit: options.columns }"
          ></ng-container>
        </thead>
        <tbody
          *ngIf="bodyTemplate"
          [hc-table-body]="options.columns"
          [template]="bodyTemplate"
        ></tbody>
      </table>
    </ng-template>
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
export class TableComponent implements AfterContentInit, OnChanges {
  bodyTemplate!: TemplateRef<TemplateDirective>
  headerTemplate!: TemplateRef<TemplateDirective>
  captionTemplate!: TemplateRef<TemplateDirective>
  summaryTemplate!: TemplateRef<TemplateDirective>
  optionsHeaderTemplate!: TemplateRef<TemplateDirective>

  @Input() columns: IColumn[] = []
  @Input() responsive = false
  @Input() style?: IStyle

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>
  @ViewChild('table') tableViewChild!: ElementRef

  @Input() get value(): any[] {
    return this.data.value
  }

  set value(val: any[]) {
    this.data.value = val
  }

  constructor(
    public data: DataService,
    public tableService: TableService,
    @Optional() public paginator: PaginationDirective
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.value = changes['value'].currentValue

      this.tableService.onValueChange(changes['value'].currentValue)
    }
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
        case 'optionsHeader':
          this.optionsHeaderTemplate = item.template
      }
    })
  }
}
