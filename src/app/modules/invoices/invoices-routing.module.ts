import { RouterModule, Routes } from '@angular/router'

import { InvoicesComponent } from './invoices.component'
import { NgModule } from '@angular/core'

const routes: Routes = [{ path: '', component: InvoicesComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
