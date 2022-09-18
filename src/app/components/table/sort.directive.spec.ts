import { SortDirective } from './sort.directive'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('SortDirective', () => {
  it('should create an instance', async () => {
    const directive = await render(SortDirective, {
      providers: [TableService],
    })
    expect(directive).toBeTruthy()
  })
})
