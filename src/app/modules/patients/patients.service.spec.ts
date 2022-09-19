import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PatientsService } from './patients.service'
import { TestBed } from '@angular/core/testing'

describe('PatientsService', () => {
  let service: PatientsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
    service = TestBed.inject(PatientsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
