import { ButtonModule } from 'src/app/components/button/button.module'
import { CardModule } from '../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { ModalModule } from '../../../components/modal/modal.module'
import { NgModule } from '@angular/core'
import { OverlayRoutingModule } from './overlay-routing.module'
import { PageModalComponent } from './page-modal/page-modal.component'
import { TemplateModule } from 'src/app/directives/template/template.module'

@NgModule({
  declarations: [PageModalComponent],
  imports: [
    CommonModule,
    OverlayRoutingModule,
    CardModule,
    ButtonModule,
    ModalModule,
    TemplateModule,
  ],
})
export class OverlayModule {}
