import { ButtonModule } from 'src/app/components/button/button.module'
import { DropdownNotificationsComponent } from './dropdown-notifications.component'
import { IconModule } from 'src/app/components/icon/icon.module'
import { render } from '@testing-library/angular'

describe('DropdownNotificationsComponent', () => {
  const setup = async () => {
    return render(DropdownNotificationsComponent, {
      imports: [IconModule, ButtonModule],
    })
  }

  it('create dropdown notification', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
