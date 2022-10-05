import { SelectComponent } from './select.component'
import { render } from '@testing-library/angular'

describe('SelectComponent', () => {
  it('create a select', async () => {
    const { container } = await render(SelectComponent)
    expect(container).toBeInTheDocument()
  })
})
