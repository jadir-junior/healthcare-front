import { BasicComponent } from './basic/basic.component'
import { ButtonModule } from 'src/app/components/button/button.module'
import { CommonModule } from '@angular/common'
import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { IconModule } from 'src/app/components/icon/icon.module'
import { NgModule } from '@angular/core'
import { PageComponent } from './page/page.component'
import { PaginationModule } from 'src/app/components/pagination/pagination.module'
import { SelectAllComponent } from './select-all/select-all.component'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'
import { TableModule as TableModuleComponent } from '../../../components/table/table.module'
import { TableRoutingModule } from './table-routing.module'
import { TemplateModule } from 'src/app/directives/template/template.module'

@NgModule({
  declarations: [
    BasicComponent,
    DynamicComponent,
    GridlinesComponent,
    SortComponent,
    PageComponent,
    SelectionComponent,
    SelectAllComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    TableModuleComponent,
    TemplateModule,
    PaginationModule,
    ButtonModule,
    IconModule,
  ],
})
export class TableModule {}
