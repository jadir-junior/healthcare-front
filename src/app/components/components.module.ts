import { InputModule } from './input/input.module'
import { NgModule } from '@angular/core'
import { SwitchModule } from './switch/switch.module'

const modules = [InputModule, SwitchModule]

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class ComponentsModule {}
