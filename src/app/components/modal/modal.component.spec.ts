import { ModalComponent } from './modal.component'
import { render } from '@testing-library/angular'

describe('ModalComponent', () => {
  it('create a modal component', async () => {
    const { container } = await render(ModalComponent)
    expect(container).toBeInTheDocument()
  })
})
