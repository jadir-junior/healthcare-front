import { LoginComponent } from './login/login.component'
import { RouterTestingModule } from '@angular/router/testing'
import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { LocalStorageService } from 'src/app/common/local-storage/local-storage.service'

import { AuthGuard } from './auth.guard'
import { MockComponent } from 'ng-mocks'

describe('AuthGuard', () => {
  let guard: AuthGuard
  let localStorage: LocalStorageService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: MockComponent(LoginComponent) },
        ]),
      ],
    })
    guard = TestBed.inject(AuthGuard)
    localStorage = TestBed.inject(LocalStorageService)
    router = TestBed.inject(Router)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
    expect(localStorage).toBeTruthy()
    expect(router).toBeTruthy()
  })

  it('if not have token must to go login page and return false', () => {
    jest.spyOn(router, 'navigate')

    const result = guard.canActivate()

    expect(router.navigate).toHaveBeenCalledWith(['/auth/login'])
    expect(result).toBe(false)
  })

  it('if have a token must return true', () => {
    localStorage.set('HC_TOKEN', { token: '123-abc' })

    const result = guard.canActivate()

    expect(result).toBe(true)
  })
})
