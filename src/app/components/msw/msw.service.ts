import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class MswService {
  setMockServiceWorkerLocalStorage(start: boolean) {
    window.localStorage.setItem('MSW', JSON.stringify(start))
  }

  getMockServiceWorkerLocalStorage(): boolean {
    const msw: boolean | null = JSON.parse(window.localStorage.getItem('MSW') as string)

    if (msw) {
      return msw
    }

    return false
  }
}
