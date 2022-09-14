import { RouterModule, Routes } from '@angular/router'

import { NgModule } from '@angular/core'
import { PageNotFoundComponent } from './modules/authentication/page-not-found/page-not-found.component'

const routes: Routes = [
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
    path: '',
    redirectTo: 'auth',
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
