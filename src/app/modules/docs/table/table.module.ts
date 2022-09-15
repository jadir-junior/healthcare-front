import { BasicComponent } from './basic/basic.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TableModule as TableModuleComponent } from '../../../components/table/table.module'
import { TableRoutingModule } from './table-routing.module'
import { TemplateModule } from 'src/app/directives/template/template.module'

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, TableRoutingModule, TableModuleComponent, TemplateModule],
})
export class TableModule {}
