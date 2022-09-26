import { render, screen } from '@testing-library/angular'

import { MenuComponent } from './menu.component'
import { MenuItemComponent } from './menu-item.component'

describe('MenuItemComponent', () => {
  it('create a menu item', async () => {
    const { container } = await render(MenuItemComponent, {
      providers: [MenuComponent],
    })
    expect(container).toBeInTheDocument()
  })

  it('create menu item with label', async () => {
    await render(MenuItemComponent, {
      providers: [MenuComponent],
      componentProperties: {
        item: {
          label: 'My Profile',
        },
      },
    })

    expect(screen.getByText(/my profile/i)).toBeInTheDocument()
  })

  it('create menu item with label and icon', async () => {
    await render(MenuItemComponent, {
      providers: [MenuComponent],
      componentProperties: {
        item: {
          label: 'My Profile',
          icon: 'dashboard',
        },
      },
    })

    expect(screen.getByText(/my profile/i)).toBeInTheDocument()
  })
})
