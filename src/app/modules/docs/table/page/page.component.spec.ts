import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PageComponent } from './page.component'
import { render } from '@testing-library/angular'

describe('PageComponent', () => {
  const setup = async () => {
    return render(PageComponent, {
      imports: [HttpClientTestingModule],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
