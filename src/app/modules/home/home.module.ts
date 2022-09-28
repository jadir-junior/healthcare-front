import { AvatarModule } from './../../components/avatar/avatar.module'
import { BadgeModule } from './../../components/badge/badge.module'
import { ButtonModule } from './../../components/button/button.module'
import { CardModule } from './../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { DropdownModule } from './../../components/dropdown/dropdown.module'
import { DropdownNotificationsComponent } from './components/dropdown-notifications/dropdown-notifications.component'
import { DropdownProfileComponent } from './components/dropdown-profile/dropdown-profile.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { IconModule } from 'src/app/components/icon/icon.module'
import { LogoModule } from './../../components/logo/logo.module'
import { MenuModule } from './../../components/menu/menu.module'
import { NgModule } from '@angular/core'
import { SearchModule } from './../../components/search/search.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { TemplateModule } from './../../directives/template/template.module'
import { ToolbarModule } from './../../components/toolbar/toolbar.module'

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    DropdownProfileComponent,
    DropdownNotificationsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    MenuModule,
    LogoModule,
    DropdownModule,
    CardModule,
    AvatarModule,
    ToolbarModule,
    TemplateModule,
    SearchModule,
    ButtonModule,
    BadgeModule,
    IconModule,
  ],
})
export class HomeModule {}
