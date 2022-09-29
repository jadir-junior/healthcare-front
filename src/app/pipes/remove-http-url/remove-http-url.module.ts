import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RemoveHttpUrlPipe } from './remove-http-url.pipe'

@NgModule({
  declarations: [RemoveHttpUrlPipe],
  imports: [CommonModule],
  exports: [RemoveHttpUrlPipe],
})
export class RemoveHttpUrlModule {}
