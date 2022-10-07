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
      {
        path: 'form',
        loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
      },
      {
        path: 'data',
        loadChildren: () => import('./data/data.module').then((m) => m.DataModule),
      },
      {
        path: 'misc',
        loadChildren: () => import('./misc/misc.module').then((m) => m.MiscModule),
      },
      {
        path: 'overlay',
        loadChildren: () =>
          import('./overlay/overlay.module').then((m) => m.OverlayModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
