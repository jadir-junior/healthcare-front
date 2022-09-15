import { RouterModule, Routes } from '@angular/router'

import { BasicComponent } from './basic/basic.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: 'basic',
    component: BasicComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableRoutingModule {}
