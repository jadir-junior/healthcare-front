import { RouterModule, Routes } from '@angular/router'

import { EditComponent } from './edit/edit.component'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { breadcrumb: 'User' },
  },
  {
    path: 'edit',
    component: EditComponent,
    data: { breadcrumb: 'Edit' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
