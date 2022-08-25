import { InputModule } from './input/input.module'
import { NgModule } from '@angular/core'

const modules = [InputModule]

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class ComponentsModule {}
