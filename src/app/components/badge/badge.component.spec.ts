import { render, screen } from '@testing-library/angular'

import { BadgeComponent } from './badge.component'

describe('BadgeComponent', () => {
  it('create a component badge', async () => {
    const { container } = await render(BadgeComponent)
    expect(container).toBeInTheDocument()
  })

  it('create a badge with value 8', async () => {
    await render(BadgeComponent, {
      componentProperties: {
        value: '8',
      },
    })

    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('create a badge with default severity', async () => {
    await render(BadgeComponent, {
      componentProperties: {
        value: '8',
      },
    })

    expect(screen.getByRole(/badge/i)).toHaveClass('hc-badge-danger')
  })
})
