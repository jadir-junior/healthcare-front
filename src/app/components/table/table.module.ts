import { CommonModule } from '@angular/common'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { PaginationModule } from '../pagination/pagination.module'
import { SortIconComponent } from './sort-icon.component'
import { SortableColumnDirective } from './sortable-column.directive'
import { TableCheckBoxComponent } from './table-check-box.component'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [
    TableComponent,
    InjectHTMLDirective,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
  ],
  imports: [CommonModule, PaginationModule],
  exports: [
    TableComponent,
    SortableColumnDirective,
    SortIconComponent,
    TableCheckBoxComponent,
  ],
})
export class TableModule {}
