import { render, screen } from '@testing-library/angular'

import { ButtonComponent } from './button.component'
import { ButtonModule } from './button.module'
import { Component } from '@angular/core'
import userEvent from '@testing-library/user-event'

@Component({
  selector: 'hc-wrapper-button',
  template: `<div data-testid="outside">
    <hc-button icon="notification" theme="text"></hc-button>
  </div>`,
})
class WrapperButtonComponent {}

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

  it('button add class on hover and when mouse leave remove hover class', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        color: 'primary',
        ariaLabel: 'button',
      },
    })

    const button = screen.getByRole('button', { name: /button/i })

    await userEvent.hover(button)

    expect(button).toHaveClass('btn-contained-primary-hover')

    await userEvent.unhover(button)

    expect(button).not.toHaveClass('btn-contained-primary-hover')
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

  it('button icon only', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        icon: 'notifications',
      },
    })

    expect(screen.getByRole('button')).toHaveClass('btn-icon-only')
  })

  it('remove pressed when click outise button', async () => {
    await render(WrapperButtonComponent, {
      imports: [ButtonModule],
    })

    await userEvent.click(screen.getByRole('button'))

    expect(screen.getByRole('button')).toHaveClass('btn-text-default-pressed')

    await userEvent.click(screen.getByTestId('outside'))

    expect(screen.getByRole('button')).not.toHaveClass('btn-text-default-pressed')
  })
})
