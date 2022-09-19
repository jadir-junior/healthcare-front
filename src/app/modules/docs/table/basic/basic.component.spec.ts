import { BasicComponent } from './basic.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { render } from '@testing-library/angular'

describe('BasicComponent', () => {
  const setup = async () => {
    return render(BasicComponent, {
      imports: [HttpClientTestingModule],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
