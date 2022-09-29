import { ButtonModule } from 'src/app/components/button/button.module'
import { CardModule } from './../../../components/card/card.module'
import { CheckboxModule } from './../../../components/checkbox/checkbox.module'
import { CommonModule } from '@angular/common'
import { DropdownModule } from './../../../components/dropdown/dropdown.module'
import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { IconModule } from 'src/app/components/icon/icon.module'
import { MarkdownModule } from 'ngx-markdown'
import { NgModule } from '@angular/core'
import { PageBasicComponent } from './page-basic/page-basic.component'
import { PageComponent } from './page/page.component'
import { PageLimitComponent } from './page-limit/page-limit.component'
import { PageToggleComponent } from './page-toggle/page-toggle.component'
import { PaginationModule } from 'src/app/components/pagination/pagination.module'
import { SelectAllComponent } from './select-all/select-all.component'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'
import { TableModule as TableModuleComponent } from '../../../components/table/table.module'
import { TableRoutingModule } from './table-routing.module'
import { TemplateModule } from 'src/app/directives/template/template.module'

@NgModule({
  declarations: [
    PageBasicComponent,
    DynamicComponent,
    GridlinesComponent,
    SortComponent,
    PageComponent,
    SelectionComponent,
    SelectAllComponent,
    PageLimitComponent,
    PageToggleComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    TableModuleComponent,
    TemplateModule,
    PaginationModule,
    ButtonModule,
    IconModule,
    CardModule,
    DropdownModule,
    CheckboxModule,
    MarkdownModule.forChild(),
  ],
})
export class TableModule {}
