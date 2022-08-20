import { render, screen } from '@testing-library/angular'

import { InputComponent } from './input.component'
import userEvent from '@testing-library/user-event'

describe('InputComponent', () => {
  it('should create component input', async () => {
    const { container } = await render(InputComponent)
    expect(container).toBeInTheDocument()
  })

  it('should get border primary color in focus', async () => {
    await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'input',
      },
    })

    expect(screen.getByRole('textbox', { name: 'input' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('textbox', { name: 'input' }))

    expect(screen.getByRole('textbox', { name: 'input' })).toHaveClass('input-focus')
  })
})
