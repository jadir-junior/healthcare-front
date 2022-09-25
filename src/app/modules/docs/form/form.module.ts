import { CardModule } from './../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { FormRoutingModule } from './form-routing.module'
import { InputModule } from 'src/app/components/input/input.module'
import { NgModule } from '@angular/core'
import { PageInputTextComponent } from './page-input-text/page-input-text.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [PageInputTextComponent],
  imports: [
    CommonModule,
    FormRoutingModule,
    InputModule,
    ReactiveFormsModule,
    CardModule,
  ],
})
export class FormModule {}
