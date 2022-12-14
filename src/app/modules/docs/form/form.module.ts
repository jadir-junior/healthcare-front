import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CardModule } from './../../../components/card/card.module'
import { CheckboxModule } from './../../../components/checkbox/checkbox.module'
import { CommonModule } from '@angular/common'
import { FormRoutingModule } from './form-routing.module'
import { InputModule } from 'src/app/components/input/input.module'
import { NgModule } from '@angular/core'
import { PageCheckboxComponent } from './page-checkbox/page-checkbox.component'
import { PageInputTextComponent } from './page-input-text/page-input-text.component'
import { PageSelectComponent } from './page-select/page-select.component'
import { PageSwitchComponent } from './page-switch/page-switch.component'
import { SelectModule } from '../../../components/select/select.module'
import { SwitchModule } from '../../../components/switch/switch.module'

@NgModule({
  declarations: [
    PageInputTextComponent,
    PageCheckboxComponent,
    PageSelectComponent,
    PageSwitchComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    InputModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    SelectModule,
    SwitchModule,
  ],
})
export class FormModule {}
