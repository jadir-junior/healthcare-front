import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { NgSelectModule } from '@ng-select/ng-select'
import { PaginationDirective } from './pagination.directive'
import { PaginationModule } from '../pagination/pagination.module'
import { RowExpandDirective } from './row-expand.directive'
import { RowTogglerDirective } from './row-toggler.directive'
import { SelectAllComponent } from './select-all.component'
import { SelectDirective } from './select.directive'
import { SortDirective } from './sort.directive'
import { SortIconComponent } from './sort-icon.component'
import { SortableColumnDirective } from './sortable-column.directive'
import { TableBodyComponent } from './table-body.component'
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
    PaginationDirective,
    SortDirective,
    SelectAllComponent,
    TableBodyComponent,
    RowTogglerDirective,
    RowExpandDirective,
  ],
  imports: [CommonModule, PaginationModule, NgSelectModule, FormsModule],
  providers: [PaginationDirective, RowExpandDirective],
  exports: [
    TableComponent,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
    TableHeaderCheckboxComponent,
    SelectDirective,
    PaginationDirective,
    SortDirective,
    SelectAllComponent,
    NgSelectModule,
    FormsModule,
    TableBodyComponent,
    RowTogglerDirective,
    RowExpandDirective,
  ],
})
export class TableModule {}
