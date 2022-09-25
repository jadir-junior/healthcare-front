import { CardModule } from './../../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { DataRoutingModule } from './data-routing.module'
import { NgModule } from '@angular/core'
import { PagePaginationComponent } from './page-pagination/page-pagination.component'
import { PaginationModule } from 'src/app/components/pagination/pagination.module'

@NgModule({
  declarations: [PagePaginationComponent],
  imports: [CommonModule, DataRoutingModule, PaginationModule, CardModule],
})
export class DataModule {}
