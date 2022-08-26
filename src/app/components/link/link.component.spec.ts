import { LinkComponent } from './link.component'
import { render } from '@testing-library/angular'

describe('LinkComponent', () => {
  it('should create a component link', async () => {
    const { container } = await render(LinkComponent)

    expect(container).toBeInTheDocument()
  })
})
