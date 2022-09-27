import { AppointmentsService } from './appointments.service'
import { TestBed } from '@angular/core/testing'

describe('AppointmentsService', () => {
  let service: AppointmentsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(AppointmentsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
