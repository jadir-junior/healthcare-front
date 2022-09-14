import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { StatusComponent } from './status.component'

@NgModule({
  declarations: [StatusComponent],
  imports: [CommonModule],
  exports: [StatusComponent],
})
export class StatusModule {}
