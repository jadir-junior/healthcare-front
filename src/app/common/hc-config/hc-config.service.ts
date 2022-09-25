import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class HcConfig {
  zIndex = {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  }
}
