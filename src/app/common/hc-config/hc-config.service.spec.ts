import { TestBed } from '@angular/core/testing'

import { HcConfig } from './hc-config.service'

describe('HcConfigService', () => {
  let service: HcConfig

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(HcConfig)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
