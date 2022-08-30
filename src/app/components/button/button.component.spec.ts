import { render, screen } from '@testing-library/angular'

import { ButtonComponent } from './button.component'
import userEvent from '@testing-library/user-event'

describe('ButtonComponent', () => {
  it('should create a button default', async () => {
    const { container } = await render(ButtonComponent)

    expect(container).toBeInTheDocument()
  })

  it('button should have a button with theme "contained" and "primary" color', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        color: 'primary',
        ariaLabel: 'button',
      },
    })

    expect(screen.getByRole('button', { name: /button/i })).toHaveClass(
      'btn-contained-primary'
    )
  })

  it('button should have a button with theme "contained" and "primary" color on hover', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        color: 'primary',
        ariaLabel: 'button',
      },
    })

    const button = screen.getByRole('button', { name: /button/i })

    await userEvent.hover(button)

    expect(button).toHaveClass('btn-contained-primary-hover')
  })

  it('button should have a button "contained" and "primary" color pressed when clicked', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        color: 'primary',
        ariaLabel: 'button',
      },
    })

    const button = screen.getByRole('button', { name: /button/i })

    await userEvent.click(button)

    expect(button).toHaveClass('btn-contained-primary-pressed')
  })

  it('button must be disabled and a contained class disabled', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        color: 'primary',
        ariaLabel: 'button',
        disabled: true,
      },
    })

    expect(screen.getByRole('button', { name: /button/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /button/i })).toHaveClass(
      'btn-contained-disabled'
    )
  })
})
