import { CommonModule } from '@angular/common'
import { LinkComponent } from './link.component'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule],
  exports: [LinkComponent],
})
export class LinkModule {}
