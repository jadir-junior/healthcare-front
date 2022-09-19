import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SortComponent } from './sort.component'
import { TableModule } from '../table.module'
import { TableService } from 'src/app/components/table/table.service'
import { render } from '@testing-library/angular'

describe('SortComponent', () => {
  const setup = async () => {
    return render(SortComponent, {
      imports: [HttpClientTestingModule, TableModule],
      providers: [TableService],
    })
  }

  it('should create', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
