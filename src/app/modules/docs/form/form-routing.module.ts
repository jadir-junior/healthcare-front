import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageInputTextComponent } from './page-input-text/page-input-text.component'

const routes: Routes = [
  {
    path: 'inputtext',
    component: PageInputTextComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
