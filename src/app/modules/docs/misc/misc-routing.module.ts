import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageTagComponent } from './page-tag/page-tag.component'

const routes: Routes = [
  {
    path: 'tag',
    component: PageTagComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiscRoutingModule {}
