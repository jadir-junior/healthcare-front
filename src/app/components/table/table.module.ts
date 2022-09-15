import { CommonModule } from '@angular/common'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { SortIconComponent } from './sort-icon.component'
import { SortableColumnDirective } from './sortable-column.directive'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [
    TableComponent,
    InjectHTMLDirective,
    SortableColumnDirective,
    SortIconComponent,
  ],
  imports: [CommonModule],
  exports: [TableComponent, SortableColumnDirective, SortIconComponent],
})
export class TableModule {}
