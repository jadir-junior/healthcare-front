import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SwitchComponent } from './switch.component'

@NgModule({
  declarations: [SwitchComponent],
  imports: [CommonModule],
  exports: [SwitchComponent],
})
export class SwitchModule {}
