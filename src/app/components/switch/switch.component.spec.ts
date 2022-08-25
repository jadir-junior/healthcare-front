import { render, screen } from '@testing-library/angular'

import { SwitchComponent } from './switch.component'

describe('SwitchComponent', () => {
  it('should create a switch', async () => {
    const { container } = await render(SwitchComponent)

    expect(container).toBeInTheDocument()
  })

  it('should create a switch with label', async () => {
    await render(SwitchComponent, {
      componentProperties: {
        label: 'Remember me',
      },
    })

    expect(screen.getByText(/remember me/i)).toBeInTheDocument()
  })
})
