import { TableBaseService } from './table-base.service'
import { TestBed } from '@angular/core/testing'

describe('TableBaseService', () => {
  let service: TableBaseService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TableBaseService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
