import { NO_ERRORS_SCHEMA } from '@angular/core'
import { PatientsComponent } from './patients.component'
import { render } from '@testing-library/angular'

describe('PatientsComponent', () => {
  const setup = async () => {
    return render(PatientsComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    })
  }

  it('should create a page patient', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
