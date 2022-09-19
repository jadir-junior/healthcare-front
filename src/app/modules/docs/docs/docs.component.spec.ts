import { DocsComponent } from './docs.component'
import { RouterTestingModule } from '@angular/router/testing'
import { render } from '@testing-library/angular'

describe('DocsComponent', () => {
  const setup = async () => {
    return render(DocsComponent, {
      imports: [RouterTestingModule],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
