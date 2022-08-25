import { InputModule } from './input/input.module'
import { NgModule } from '@angular/core'
import { SwitchModule } from './switch/switch.module'
import { ButtonModule } from './button/button.module'

const modules = [InputModule, SwitchModule, ButtonModule]

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class ComponentsModule {}
