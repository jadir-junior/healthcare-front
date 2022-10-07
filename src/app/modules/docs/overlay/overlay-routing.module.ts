import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageModalComponent } from './page-modal/page-modal.component'

const routes: Routes = [
  {
    path: 'modal',
    component: PageModalComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverlayRoutingModule {}
