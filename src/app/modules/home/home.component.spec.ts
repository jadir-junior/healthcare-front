import { AvatarModule } from './../../components/avatar/avatar.module'
import { CardModule } from './../../components/card/card.module'
import { DropdownModule } from './../../components/dropdown/dropdown.module'
import { HomeComponent } from './home.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
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
      ],
    })
  }

  it('should create a home page', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
