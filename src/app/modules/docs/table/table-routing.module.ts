import { RouterModule, Routes } from '@angular/router'

import { BasicComponent } from './basic/basic.component'
import { DynamicComponent } from './dynamic/dynamic.component'
import { GridlinesComponent } from './gridlines/gridlines.component'
import { NgModule } from '@angular/core'

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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
