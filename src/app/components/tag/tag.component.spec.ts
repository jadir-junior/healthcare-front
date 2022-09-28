import { TagComponent } from './tag.component'
import { render } from '@testing-library/angular'

describe('TagComponent', () => {
  it('create a tag default primary', async () => {
    const { container } = await render(`<hc-tag>primary<hc-tag>`, {
      declarations: [TagComponent],
    })

    expect(container).toBeInTheDocument()
  })
})
