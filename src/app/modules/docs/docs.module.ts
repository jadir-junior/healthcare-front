import { LogoModule } from './../../components/logo/logo.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { CommonModule } from '@angular/common'
import { DocsComponent } from './docs/docs.component'
import { DocsRoutingModule } from './docs-routing.module'
import { NgModule } from '@angular/core'
import { TableModule } from './table/table.module'
import { TableService } from 'src/app/components/table/table.service'
import { MenuModule } from 'src/app/components/menu/menu.module'

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    DocsRoutingModule,
    TableModule,
    SidebarModule,
    LogoModule,
    MenuModule,
  ],
  providers: [TableService],
})
export class DocsModule {}
