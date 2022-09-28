import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
