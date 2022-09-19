import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SelectAllComponent } from './select-all.component'
import { render } from '@testing-library/angular'

describe('SelectAllComponent', () => {
  const setup = async () => {
    return render(SelectAllComponent, {
      imports: [HttpClientTestingModule],
    })
  }

  it('should create a page', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
