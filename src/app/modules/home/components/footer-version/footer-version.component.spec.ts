import { FooterVersionComponent } from './footer-version.component'
import { render } from '@testing-library/angular'

describe('FooterVersionComponent', () => {
  it('create a footer version', () => {
    const { container } = render(FooterVersionComponent)
    expect(container).toBeInTheDocument()
  })
})
