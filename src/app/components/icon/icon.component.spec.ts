import { IconComponent } from './icon.component'
import { render } from '@testing-library/angular'

describe('IconComponent', () => {
  it('should create a component icon', async () => {
    const { container } = await render(IconComponent)
    expect(container).toBeInTheDocument()
  })
})
