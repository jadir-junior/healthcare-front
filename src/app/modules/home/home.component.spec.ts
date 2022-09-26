import { AvatarModule } from './../../components/avatar/avatar.module'
import { CardModule } from './../../components/card/card.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { DropdownModule } from './../../components/dropdown/dropdown.module'
import { LogoModule } from './../../components/logo/logo.module'
import { MenuModule } from './../../components/menu/menu.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { render } from '@testing-library/angular'

import { HomeComponent } from './home.component'

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
      ],
    })
  }

  it('should create a home page', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
