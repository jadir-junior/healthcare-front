import { DataDirective } from './data.directive'
import { PaginationDirective } from './pagination.directive'
import { SelectDirective } from './select.directive'
import { SortDirective } from './sort.directive'
import { TableCheckBoxComponent } from './table-check-box.component'
import { TableComponent } from './table.component'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('TableCheckBoxComponent', () => {
  const setup = async () => {
    return render(TableCheckBoxComponent, {
      declarations: [
        TableComponent,
        DataDirective,
        SortDirective,
        PaginationDirective,
        SelectDirective,
      ],
      providers: [
        TableComponent,
        DataDirective,
        TableService,
        SortDirective,
        PaginationDirective,
        SelectDirective,
      ],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
