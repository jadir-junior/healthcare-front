import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PaymentsService } from './payments.service'
import { TestBed } from '@angular/core/testing'

describe('PaymentsService', () => {
  let service: PaymentsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(PaymentsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
