import { ButtonComponent } from './button.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ButtonDirective } from './button.directive'

@NgModule({
  declarations: [ButtonComponent, ButtonDirective],
  imports: [CommonModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
