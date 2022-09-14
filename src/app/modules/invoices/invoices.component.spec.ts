import { InvoicesComponent } from './invoices.component'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { render } from '@testing-library/angular'

describe('InvoicesComponent', () => {
  const setup = async () => {
    return render(InvoicesComponent, {
      schemas: [NO_ERRORS_SCHEMA],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
