import { AvatarModule } from './../../../../components/avatar/avatar.module'
import { BadgeModule } from './../../../../components/badge/badge.module'
import { ButtonModule } from 'src/app/components/button/button.module'
import { DropdownModule } from '../../../../components/dropdown/dropdown.module'
import { HeaderComponent } from './header.component'
import { SearchModule } from './../../../../components/search/search.module'
import { ToolbarModule } from './../../../../components/toolbar/toolbar.module'
import { render } from '@testing-library/angular'

describe('HeaderComponent', () => {
  const setup = async () => {
    return render(HeaderComponent, {
      imports: [
        ToolbarModule,
        SearchModule,
        BadgeModule,
        ButtonModule,
        AvatarModule,
        DropdownModule,
      ],
    })
  }

  it('should create a header component', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
