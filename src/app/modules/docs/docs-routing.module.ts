import { RouterModule, Routes } from '@angular/router'

import { DocsComponent } from './docs/docs.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: 'table',
        loadChildren: () => import('./table/table.module').then((m) => m.TableModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
