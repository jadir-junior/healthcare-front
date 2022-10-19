import { TabComponent } from './tab.component'
import { render } from '@testing-library/angular'

describe('TabComponent', () => {
  it('should create', async () => {
    const { container } = await render(TabComponent)
    expect(container).toBeInTheDocument()
  })
})
