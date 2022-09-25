import { render, screen } from '@testing-library/angular'

import { CardComponent } from './card.component'

describe('CardComponent', () => {
  it('should create', async () => {
    const { container } = await render(CardComponent)

    expect(container).toBeInTheDocument()
  })

  it('create a card with a header', async () => {
    await render(CardComponent, {
      componentProperties: {
        header: 'Introduction',
      },
    })

    expect(screen.getByText(/introduction/i)).toBeInTheDocument()
  })

  it('create a card with content', async () => {
    await render(`<hc-card>content</hc-card>`, {
      declarations: [CardComponent],
    })

    expect(screen.getByText(/content/i)).toBeInTheDocument()
  })
})
