import { DataDirective } from './data.directive'
import { SelectDirective } from './select.directive'
import { TableService } from './table.service'
import { render } from '@testing-library/angular'

describe('SelectDirective', () => {
  it('should create an instance', async () => {
    const directive = await render(SelectDirective, {
      providers: [TableService],
      declarations: [DataDirective],
    })
    expect(directive).toBeTruthy()
  })
})
