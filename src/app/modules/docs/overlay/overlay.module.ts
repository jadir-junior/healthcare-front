import { ButtonModule } from 'src/app/components/button/button.module'
import { CardModule } from '../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { ModalModule } from '../../../components/modal/modal.module'
import { NgModule } from '@angular/core'
import { OverlayRoutingModule } from './overlay-routing.module'
import { PageModalComponent } from './page-modal/page-modal.component'
import { PageTooltipComponent } from './page-tooltip/page-tooltip.component'
import { TemplateModule } from 'src/app/directives/template/template.module'
import { TooltipModule } from './../../../components/tooltip/tooltip.module'

@NgModule({
  declarations: [PageModalComponent, PageTooltipComponent],
  imports: [
    CommonModule,
    OverlayRoutingModule,
    CardModule,
    ButtonModule,
    ModalModule,
    TemplateModule,
    TooltipModule,
  ],
})
export class OverlayModule {}
