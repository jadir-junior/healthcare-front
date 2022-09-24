import { TestBed } from '@angular/core/testing'

import { LocalStorageService } from './local-storage.service'

describe('LocalStorageService', () => {
  let service: LocalStorageService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LocalStorageService)
  })

  it('set a item', () => {
    service.set('HC_ITEM', { name: 'Joe Doe' })

    expect(service.get('HC_ITEM')).toEqual({ name: 'Joe Doe' })
  })

  it('get a null item', () => {
    expect(service.get('HC_TEST')).toBe(null)
  })
})
