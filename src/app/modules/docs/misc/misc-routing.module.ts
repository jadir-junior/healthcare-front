import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageSkeletonComponent } from './page-skeleton/page-skeleton.component'
import { PageTagComponent } from './page-tag/page-tag.component'

const routes: Routes = [
  {
    path: 'skeleton',
    component: PageSkeletonComponent,
  },
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
