import { TableComponent } from './table.component'
import { render } from '@testing-library/angular'

describe('TableComponent', () => {
  const setup = async () => {
    return render(TableComponent)
  }

  it('should create a component', async () => {
    const { container } = await setup()
    expect(container).toBeTruthy()
  })
})
