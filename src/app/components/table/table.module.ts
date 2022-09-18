import { CommonModule } from '@angular/common'
import { DataDirective } from './data.directive'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { PaginationDirective } from './pagination.directive'
import { PaginationModule } from '../pagination/pagination.module'
import { SelectDirective } from './select.directive'
import { SortDirective } from './sort.directive'
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
    SelectDirective,
    DataDirective,
    PaginationDirective,
    SortDirective,
  ],
  imports: [CommonModule, PaginationModule],
  exports: [
    TableComponent,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
    TableHeaderCheckboxComponent,
    SelectDirective,
    DataDirective,
    PaginationDirective,
    SortDirective,
  ],
})
export class TableModule {}
