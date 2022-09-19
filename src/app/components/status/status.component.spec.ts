import { NO_ERRORS_SCHEMA } from '@angular/core'
import { StatusComponent } from './status.component'
import { render } from '@testing-library/angular'

describe('StatusComponent', () => {
  const setup = async () => {
    return render(StatusComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    })
  }

  it('should create a component status', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
