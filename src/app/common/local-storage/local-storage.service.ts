/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  set(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any | null {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }

  remove(key: string): void {
    window.localStorage.removeItem(key)
  }
}
