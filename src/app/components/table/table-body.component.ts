import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core'

import { DataService } from './data.service'
import { IColumn } from 'src/app/components/table/table.component'
import { RowExpandDirective } from './row-expand.directive'
import { Subscription } from 'rxjs'
import { TableService } from './table.service'
import { TemplateDirective } from '../../directives/template/template.directive'

@Component({
  selector: '[hc-table-body]',
  template: `
    <ng-container *ngIf="!expandedRowTemplate">
      <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="data.value">
        <ng-container
          *ngTemplateOutlet="template; context: { $implicit: rowData, columns }"
        ></ng-container>
      </ng-template>
    </ng-container>
    <ng-container *ngIf="expandedRowTemplate">
      <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="data.value">
        <ng-container
          *ngTemplateOutlet="
            template;
            context: {
              $implicit: rowData,
              columns: columns,
              expanded: rowExpand.isRowExpanded(rowData)
            }
          "
        ></ng-container>
        <ng-container *ngIf="rowExpand.isRowExpanded(rowData)">
          <ng-container
            *ngTemplateOutlet="
              expandedRowTemplate;
              context: { $implicit: rowData, columns: columns }
            "
          ></ng-container>
        </ng-container>
      </ng-template>
    </ng-container>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class TableBodyComponent implements OnDestroy {
  subscription!: Subscription

  @Input('hc-table-body') columns!: IColumn[]
  @Input() template!: TemplateRef<TemplateDirective>
  @Input() expandedRowTemplate!: TemplateRef<TemplateDirective>

  constructor(
    public data: DataService,
    public cd: ChangeDetectorRef,
    public tableService: TableService,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public rowExpand: RowExpandDirective<any>
  ) {
    this.subscription = this.tableService.valueSource$.subscribe(() => {
      this.cd.detectChanges()
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
