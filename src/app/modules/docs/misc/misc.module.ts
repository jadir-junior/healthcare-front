import { CardModule } from './../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { MiscRoutingModule } from './misc-routing.module'
import { NgModule } from '@angular/core'
import { PageTagComponent } from './page-tag/page-tag.component'
import { TagModule } from '../../../components/tag/tag.module'

@NgModule({
  declarations: [PageTagComponent],
  imports: [CommonModule, MiscRoutingModule, CardModule, TagModule],
})
export class MiscModule {}
