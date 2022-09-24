import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './modules/authentication/page-not-found/page-not-found.component'
import { AuthGuard } from './modules/authentication/auth.guard'

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./modules/patients/patients.module').then((m) => m.PatientsModule),
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./modules/invoices/invoices.module').then((m) => m.InvoicesModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('./modules/docs/docs.module').then((m) => m.DocsModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
