import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageCheckboxComponent } from './page-checkbox/page-checkbox.component'
import { PageInputTextComponent } from './page-input-text/page-input-text.component'

const routes: Routes = [
  {
    path: 'inputtext',
    component: PageInputTextComponent,
  },
  {
    path: 'checkbox',
    component: PageCheckboxComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
