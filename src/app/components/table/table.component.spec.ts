import { DataDirective } from './data.directive'
import { PaginationDirective } from './pagination.directive'
import { TableComponent } from './table.component'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('TableComponent', () => {
  const setup = async () => {
    return render(TableComponent, {
      declarations: [DataDirective, PaginationDirective],
      providers: [DataDirective, PaginationDirective, TableService],
    })
  }

  it('should create a component', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
  })
})
