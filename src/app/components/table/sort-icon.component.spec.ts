import { SortDirective } from './sort.directive'
import { SortIconComponent } from './sort-icon.component'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('SortIconComponent', () => {
  const setup = async () => {
    return render(SortIconComponent, {
      declarations: [SortDirective],
      providers: [TableService, SortDirective],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
