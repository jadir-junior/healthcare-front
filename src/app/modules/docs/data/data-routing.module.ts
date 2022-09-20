import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PagePaginationComponent } from './page-pagination/page-pagination.component'

const routes: Routes = [
  {
    path: 'pagination',
    component: PagePaginationComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataRoutingModule {}
