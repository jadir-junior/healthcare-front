import { CardModule } from './../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { MarkdownModule } from 'ngx-markdown'
import { MiscRoutingModule } from './misc-routing.module'
import { NgModule } from '@angular/core'
import { PageSkeletonComponent } from './page-skeleton/page-skeleton.component'
import { PageTagComponent } from './page-tag/page-tag.component'
import { SkeletonModule } from './../../../components/skeleton/skeleton.module'
import { TableModule } from '../../../components/table/table.module'
import { TagModule } from '../../../components/tag/tag.module'
import { TemplateModule } from '../../../directives/template/template.module'

@NgModule({
  declarations: [PageTagComponent, PageSkeletonComponent],
  imports: [
    CommonModule,
    MiscRoutingModule,
    CardModule,
    TagModule,
    TableModule,
    TemplateModule,
    MarkdownModule.forChild(),
    SkeletonModule,
  ],
})
export class MiscModule {}
