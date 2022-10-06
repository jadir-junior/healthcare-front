import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PagePaginationComponent } from './page-pagination/page-pagination.component'
import { PageTimelineComponent } from './page-timeline/page-timeline.component'

const routes: Routes = [
  {
    path: 'pagination',
    component: PagePaginationComponent,
  },
  {
    path: 'timeline',
    component: PageTimelineComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
