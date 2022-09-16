import { CommonModule } from '@angular/common'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { PaginationModule } from '../pagination/pagination.module'
import { SortIconComponent } from './sort-icon.component'
import { SortableColumnDirective } from './sortable-column.directive'
import { TableCheckBoxComponent } from './table-check-box.component'
import { TableComponent } from './table.component'
import { TableHeaderCheckboxComponent } from './table-header-checkbox.component'

@NgModule({
  declarations: [
    TableComponent,
    InjectHTMLDirective,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
    TableHeaderCheckboxComponent,
  ],
  imports: [CommonModule, PaginationModule],
  exports: [
    TableComponent,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
    TableHeaderCheckboxComponent,
  ],
})
export class TableModule {}
