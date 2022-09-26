import { render, screen } from '@testing-library/angular'

import { MenuComponent } from './menu.component'
import { MenuItemComponent } from './menu-item.component'
import userEvent from '@testing-library/user-event'

describe('MenuComponent', () => {
  it('create a menu without submenus', async () => {
    await render(MenuComponent, {
      declarations: [MenuItemComponent],
      componentProperties: {
        model: [
          {
            label: 'My Profile',
          },
          {
            label: 'My Appointments',
          },
          {
            label: 'Account Settings',
          },
        ],
      },
    })

    expect(screen.getByRole('menuitem', { name: /my profile/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /my appointments/i })).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: /account settings/i })
    ).toBeInTheDocument()
  })

  it('create a menu with submenu', async () => {
    await render(MenuComponent, {
      declarations: [MenuItemComponent],
      componentProperties: {
        model: [
          {
            label: 'Medicine',
            items: [
              {
                label: 'Dashboard',
              },
              {
                label: 'Doctors',
              },
            ],
          },
        ],
      },
    })

    expect(screen.getByText(/medicine/i)).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /dashboard/i })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: /doctors/i })).toBeInTheDocument()
  })

  it('create a menu and emit event click', async () => {
    const commandSpy = jest.fn()

    await render(MenuComponent, {
      declarations: [MenuItemComponent],
      componentProperties: {
        model: [
          {
            label: 'Medicine',
            command: commandSpy,
          },
        ],
      },
    })

    await userEvent.click(screen.getByRole('menuitem', { name: /medicine/i }))

    expect(commandSpy).toHaveBeenCalled()
  })
})
