import { CommonModule } from '@angular/common'
import { DocsComponent } from './docs/docs.component'
import { DocsRoutingModule } from './docs-routing.module'
import { NgModule } from '@angular/core'
import { TableModule } from './table/table.module'
import { TableService } from 'src/app/components/table/table.service'

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, DocsRoutingModule, TableModule],
  providers: [TableService],
})
export class DocsModule {}
