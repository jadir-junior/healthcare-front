import { ButtonModule } from './button/button.module'
import { IconModule } from './icon/icon.module'
import { InputModule } from './input/input.module'
import { NgModule } from '@angular/core'
import { SwitchModule } from './switch/switch.module'

const modules = [InputModule, SwitchModule, ButtonModule, IconModule]

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class ComponentsModule {}
