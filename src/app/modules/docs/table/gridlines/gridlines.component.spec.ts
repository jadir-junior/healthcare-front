import { DataDirective } from 'src/app/components/table/data.directive'
import { GridlinesComponent } from './gridlines.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PaginationDirective } from 'src/app/components/table/pagination.directive'
import { TableModule } from '../table.module'
import { TableService } from 'src/app/components/table/table.service'
import { render } from '@testing-library/angular'

describe('GridlinesComponent', () => {
  const setup = async () => {
    return render(GridlinesComponent, {
      imports: [HttpClientTestingModule, TableModule],
      providers: [TableService, DataDirective, PaginationDirective],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
