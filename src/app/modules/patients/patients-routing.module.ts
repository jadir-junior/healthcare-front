import { RouterModule, Routes } from '@angular/router'

import { CreatePatientComponent } from './create-patient/create-patient.component'
import { NgModule } from '@angular/core'
import { PatientsComponent } from './patients/patients.component'

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
  },
  {
    path: 'create',
    component: CreatePatientComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
