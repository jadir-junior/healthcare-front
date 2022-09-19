import { DataDirective } from './data.directive'
import { PaginationDirective } from './pagination.directive'
import { SelectDirective } from './select.directive'
import { TableHeaderCheckboxComponent } from './table-header-checkbox.component'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('TableHeaderCheckboxComponent', () => {
  const setup = async () => {
    return render(TableHeaderCheckboxComponent, {
      declarations: [SelectDirective, DataDirective, PaginationDirective],
      providers: [TableService, SelectDirective, DataDirective, PaginationDirective],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
