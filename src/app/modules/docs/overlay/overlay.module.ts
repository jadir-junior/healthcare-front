import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { OverlayRoutingModule } from './overlay-routing.module'
import { PageModalComponent } from './page-modal/page-modal.component'

@NgModule({
  declarations: [PageModalComponent],
  imports: [CommonModule, OverlayRoutingModule],
})
export class OverlayModule {}
