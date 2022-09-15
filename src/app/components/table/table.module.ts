import { CommonModule } from '@angular/common'
import { InjectHTMLDirective } from 'src/app/directives/inject-html/inject-html.directive'
import { NgModule } from '@angular/core'
import { SortHeaderComponent } from './sort-header.component'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [TableComponent, InjectHTMLDirective, SortHeaderComponent],
  imports: [CommonModule],
  exports: [TableComponent, SortHeaderComponent],
})
export class TableModule {}
