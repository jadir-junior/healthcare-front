import { RouterModule, Routes } from '@angular/router'

import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { NgModule } from '@angular/core'
import { PageBasicComponent } from './page-basic/page-basic.component'
import { PageComponent } from './page/page.component'
import { PageLimitComponent } from './page-limit/page-limit.component'
import { PageToggleComponent } from './page-toggle/page-toggle.component'
import { SelectAllComponent } from './select-all/select-all.component'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'

const routes: Routes = [
  {
    path: 'basic',
    component: PageBasicComponent,
  },
  {
    path: 'dynamic',
    component: DynamicComponent,
  },
  {
    path: 'gridlines',
    component: GridlinesComponent,
  },
  {
    path: 'page',
    component: PageComponent,
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
    path: 'limit',
    component: PageLimitComponent,
  },
  {
    path: 'selectall',
    component: SelectAllComponent,
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
