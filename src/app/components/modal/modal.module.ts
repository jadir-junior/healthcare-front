import { CommonModule } from '@angular/common'
import { ModalComponent } from './modal.component'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule],
  exports: [ModalComponent],
})
export class ModalModule {}
