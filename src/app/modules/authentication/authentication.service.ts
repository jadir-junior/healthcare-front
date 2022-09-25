import { Router } from '@angular/router'
import { environment } from './../../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LocalStorageService } from 'src/app/common/local-storage/local-storage.service'

export interface ILoginUserDto {
  login: string
  password: string
  rememberMe: boolean
}

export interface IToken {
  token: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  login(user: ILoginUserDto): void {
    this.http.post<IToken>(`${environment.BASE_URL}/login`, user).subscribe({
      next: (token: IToken) => {
        this.localStorage.set('HC_TOKEN', token)
        this.router.navigate(['home'])
      },
    })
  }

  logout(): void {
    this.localStorage.remove('HC_TOKEN')
    this.router.navigate(['/auth/login'])
  }
}
