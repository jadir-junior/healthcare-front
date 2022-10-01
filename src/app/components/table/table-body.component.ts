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
import { Subscription } from 'rxjs'
import { TableService } from './table.service'
import { TemplateDirective } from '../../directives/template/template.directive'

@Component({
  selector: '[hc-table-body]',
  template: `
    <ng-container>
      <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="data.value">
        <ng-container
          *ngTemplateOutlet="template; context: { $implicit: rowData, columns }"
        ></ng-container>
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

  constructor(
    public data: DataService,
    public cd: ChangeDetectorRef,
    public tableService: TableService
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
