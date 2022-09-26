import { AvatarModule } from './../../../../components/avatar/avatar.module'
import { DropdownProfileComponent } from './dropdown-profile.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MenuModule } from './../../../../components/menu/menu.module'
import { render } from '@testing-library/angular'

describe('DropdownProfileComponent', () => {
  const setup = async () => {
    return render(DropdownProfileComponent, {
      imports: [HttpClientTestingModule, AvatarModule, MenuModule],
    })
  }

  it('create a dropdown profile', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
