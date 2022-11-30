import { AvatarModule } from './../../components/avatar/avatar.module'
import { BadgeModule } from './../../components/badge/badge.module'
import { BreadcrumbModule } from './../../components/breadcrumb/breadcrumb.module'
import { ButtonModule } from './../../components/button/button.module'
import { CardModule } from './../../components/card/card.module'
import { DropdownModule } from './../../components/dropdown/dropdown.module'
import { DropdownNotificationsComponent } from './components/dropdown-notifications/dropdown-notifications.component'
import { DropdownProfileComponent } from './components/dropdown-profile/dropdown-profile.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './home.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IconModule } from '../../components/icon/icon.module'
import { LogoModule } from './../../components/logo/logo.module'
import { MenuModule } from './../../components/menu/menu.module'
import { SearchModule } from './../../components/search/search.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { TemplateModule } from './../../directives/template/template.module'
import { ToolbarModule } from '../../components/toolbar/toolbar.module'
import { render } from '@testing-library/angular'

describe('HomeComponent', () => {
  const setup = async () => {
    return render(HomeComponent, {
      declarations: [
        HeaderComponent,
        DropdownProfileComponent,
        DropdownNotificationsComponent,
      ],
      imports: [
        SidebarModule,
        MenuModule,
        LogoModule,
        DropdownModule,
        HttpClientTestingModule,
        CardModule,
        AvatarModule,
        ToolbarModule,
        TemplateModule,
        SearchModule,
        ButtonModule,
        BadgeModule,
        IconModule,
        BreadcrumbModule,
      ],
    })
  }

  it('should create a home page', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
