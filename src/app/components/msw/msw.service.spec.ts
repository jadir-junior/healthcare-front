import { MswService } from './msw.service'
import { TestBed } from '@angular/core/testing'

describe('MswService', () => {
  let service: MswService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(MswService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
