import { DynamicComponent } from './dynamic.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PaginationDirective } from 'src/app/components/table/pagination.directive'
import { TableModule } from '../table.module'
import { TableService } from 'src/app/components/table/table.service'
import { render } from '@testing-library/angular'

describe('DynamicComponent', () => {
  const setup = async () => {
    return render(DynamicComponent, {
      imports: [HttpClientTestingModule, TableModule],
      providers: [TableService, PaginationDirective],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
