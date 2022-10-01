import { ButtonModule } from 'src/app/components/button/button.module'
import { CardModule } from './../../../components/card/card.module'
import { CheckboxModule } from './../../../components/checkbox/checkbox.module'
import { CommonModule } from '@angular/common'
import { DropdownModule } from './../../../components/dropdown/dropdown.module'
import { IconModule } from 'src/app/components/icon/icon.module'
import { MarkdownModule } from 'ngx-markdown'
import { NgModule } from '@angular/core'
import { PageBasicComponent } from './page-basic/page-basic.component'
import { PageComponent } from './page/page.component'
import { PageDynamicComponent } from './page-dynamic/page-dynamic.component'
import { PageGridlinesComponent } from './page-gridlines/page-gridlines.component'
import { PageLimitComponent } from './page-limit/page-limit.component'
import { PageScrollComponent } from './page-scroll/page-scroll.component'
import { PageSelectAllComponent } from './page-select-all/page-select-all.component'
import { PageToggleComponent } from './page-toggle/page-toggle.component'
import { PaginationModule } from 'src/app/components/pagination/pagination.module'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'
import { TableModule as TableModuleComponent } from '../../../components/table/table.module'
import { TableRoutingModule } from './table-routing.module'
import { TemplateModule } from 'src/app/directives/template/template.module'

@NgModule({
  declarations: [
    PageBasicComponent,
    PageDynamicComponent,
    PageGridlinesComponent,
    SortComponent,
    PageComponent,
    SelectionComponent,
    PageSelectAllComponent,
    PageLimitComponent,
    PageToggleComponent,
    PageScrollComponent,
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
