import { CardModule } from './../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { IconModule } from './../../components/icon/icon.module'
import { NgModule } from '@angular/core'
import { TemplateModule } from '../../directives/template/template.module'
import { TimelineModule } from './../../components/timeline/timeline.module'

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    TimelineModule,
    TemplateModule,
    IconModule,
  ],
})
export class DashboardModule {}
