import { CheckboxComponent } from './checkbox.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CheckboxComponent, ReactiveFormsModule],
})
export class CheckboxModule {}
