import { RouterModule, Routes } from '@angular/router'

import { EditComponent } from './edit/edit.component'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
