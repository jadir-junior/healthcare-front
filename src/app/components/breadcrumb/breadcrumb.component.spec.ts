import { BreadcrumbComponent } from './breadcrumb.component'
import { render } from '@testing-library/angular'

describe('BreadcrumbComponent', () => {
  it('should create', async () => {
    const { container } = await render(BreadcrumbComponent)
    expect(container).toBeInTheDocument()
  })
})
