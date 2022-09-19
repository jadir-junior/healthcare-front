import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SelectionComponent } from './selection.component'
import { render } from '@testing-library/angular'

describe('SelectionComponent', () => {
  const setup = async () => {
    return render(SelectionComponent, {
      imports: [HttpClientTestingModule],
    })
  }

  it('should create a page', async () => {
    const { container } = await setup()
    expect(container).toBeTruthy()
  })
})
