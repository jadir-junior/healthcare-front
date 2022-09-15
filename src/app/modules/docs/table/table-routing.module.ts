import { RouterModule, Routes } from '@angular/router'

import { BasicComponent } from './basic/basic.component'
import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { NgModule } from '@angular/core'
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
    path: 'sort',
    component: SortComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
