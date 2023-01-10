import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageModalComponent } from './page-modal/page-modal.component'
import { PageTooltipComponent } from './page-tooltip/page-tooltip.component'

const routes: Routes = [
  {
    path: 'modal',
    component: PageModalComponent,
  },
  {
    path: 'tooltip',
    component: PageTooltipComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverlayRoutingModule {}
