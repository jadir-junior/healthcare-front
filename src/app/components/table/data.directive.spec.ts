import { DataDirective } from './data.directive'
import { PaginationDirective } from './pagination.directive'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('DataDirective', () => {
  it('should create an instance', async () => {
    const directive = await render(DataDirective, {
      providers: [TableService],
      declarations: [PaginationDirective],
    })

    expect(directive).toBeTruthy()
  })
})
