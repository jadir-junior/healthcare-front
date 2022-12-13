import { AvatarModule } from './../../components/avatar/avatar.module'
import { BreadcrumbModule } from './../../components/breadcrumb/breadcrumb.module'
import { CardModule } from './../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { IconModule } from './../../components/icon/icon.module'
import { NgModule } from '@angular/core'
import { TabModule } from '../../components/tab/tab.module'
import { TableModule } from '../../components/table/table.module'
import { TagModule } from '../../components/tag/tag.module'
import { TemplateModule } from '../../directives/template/template.module'
import { TextareaModule } from '../../components/textarea/textarea.module'
import { TimelineEventsAndMeetingsComponent } from './components/timeline-events-and-meetings/timeline-events-and-meetings.component'
import { TimelineModule } from './../../components/timeline/timeline.module'

@NgModule({
  declarations: [DashboardComponent, TimelineEventsAndMeetingsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CardModule,
    TimelineModule,
    TemplateModule,
    IconModule,
    TableModule,
    AvatarModule,
    TagModule,
    TabModule,
    BreadcrumbModule,
    TextareaModule,
  ],
})
export class DashboardModule {}
