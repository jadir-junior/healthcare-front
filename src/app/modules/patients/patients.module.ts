import { ButtonModule } from 'src/app/components/button/button.module'
import { CommonModule } from '@angular/common'
import { CreatePatientComponent } from './create-patient/create-patient.component'
import { InputModule } from 'src/app/components/input/input.module'
import { NgModule } from '@angular/core'
import { PatientsComponent } from './patients/patients.component'
import { PatientsRoutingModule } from './patients-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { TableModule } from 'src/app/components/table/table.module'

@NgModule({
  declarations: [CreatePatientComponent, PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    TableModule,
  ],
})
export class PatientsModule {}
