import { DropdownModule } from './../../components/dropdown/dropdown.module'
import { LogoModule } from './../../components/logo/logo.module'
import { MenuModule } from './../../components/menu/menu.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    MenuModule,
    LogoModule,
    DropdownModule,
  ],
})
export class HomeModule {}
