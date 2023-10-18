import { LocalStorageService } from 'src/app/common/local-storage/local-storage.service'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private localStorage: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    const token = this.localStorage.get('HC_TOKEN')

    if (token) {
      return true
    }

    this.router.navigate(['/auth/login'])
    return false
  }
}
