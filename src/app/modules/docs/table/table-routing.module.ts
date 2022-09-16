import { RouterModule, Routes } from '@angular/router'

import { BasicComponent } from './basic/basic.component'
import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { NgModule } from '@angular/core'
import { PageComponent } from './page/page.component'
import { SelectionComponent } from './selection/selection.component'
import { SortComponent } from './sort/sort.component'

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent,
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
