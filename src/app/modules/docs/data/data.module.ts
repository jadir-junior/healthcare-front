import { CardModule } from './../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { DataRoutingModule } from './data-routing.module'
import { IconModule } from './../../../components/icon/icon.module'
import { NgModule } from '@angular/core'
import { PagePaginationComponent } from './page-pagination/page-pagination.component'
import { PageTimelineComponent } from './page-timeline/page-timeline.component'
import { PaginationModule } from 'src/app/components/pagination/pagination.module'
import { TemplateModule } from '../../../directives/template/template.module'
import { TimelineModule } from './../../../components/timeline/timeline.module'

@NgModule({
  declarations: [PagePaginationComponent, PageTimelineComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    PaginationModule,
    CardModule,
    TimelineModule,
    TemplateModule,
    IconModule,
  ],
})
export class DataModule {}
