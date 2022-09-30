import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageBasicComponent } from './page-basic/page-basic.component'
import { PageComponent } from './page/page.component'
import { PageDynamicComponent } from './page-dynamic/page-dynamic.component'
import { PageGridlinesComponent } from './page-gridlines/page-gridlines.component'
import { PageLimitComponent } from './page-limit/page-limit.component'
import { PageScrollComponent } from './page-scroll/page-scroll.component'
import { PageSelectAllComponent } from './page-select-all/page-select-all.component'
import { PageToggleComponent } from './page-toggle/page-toggle.component'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'

const routes: Routes = [
  {
    path: 'basic',
    component: PageBasicComponent,
  },
  {
    path: 'dynamic',
    component: PageDynamicComponent,
  },
  {
    path: 'gridlines',
    component: PageGridlinesComponent,
  },
  {
    path: 'page',
    component: PageComponent,
  },
  {
    path: 'limit',
    component: PageLimitComponent,
  },
  {
    path: 'sort',
    component: SortComponent,
  },
  {
    path: 'selection',
    component: SelectionComponent,
  },
  {
    path: 'selectall',
    component: PageSelectAllComponent,
  },
  {
    path: 'scroll',
    component: PageScrollComponent,
  },
  {
    path: 'toggle',
    component: PageToggleComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
