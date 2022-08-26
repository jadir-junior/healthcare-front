import { PageNotFoundComponent } from './page-not-found.component'
import { render } from '@testing-library/angular'

describe('PageNotFoundComponent', () => {
  const setup = async () => {
    return render(PageNotFoundComponent)
  }

  it('should create a page not found', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
