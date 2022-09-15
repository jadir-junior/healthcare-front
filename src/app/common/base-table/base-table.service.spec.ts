import { BaseTableService } from './base-table.service'
import { TestBed } from '@angular/core/testing'

describe('BaseTableService', () => {
  let service: BaseTableService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(BaseTableService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
