import { CommonModule } from '@angular/common'
import { InputComponent } from './input.component'
import { InputMaskModule } from '@ngneat/input-mask'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, InputMaskModule],
  exports: [InputComponent],
})
export class InputModule {}
