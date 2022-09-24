import { MenuModule } from './../../components/menu/menu.module'
import { SidebarModule } from './../../components/sidebar/sidebar.module'
import { render } from '@testing-library/angular'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  const setup = async () => {
    return render(HomeComponent, {
      imports: [SidebarModule, MenuModule],
    })
  }

  it('should create a home page', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
