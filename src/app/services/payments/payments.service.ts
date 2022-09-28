import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface ILastPayments {
  id: string
  recipient: string
  amount: number
  date: Date
}

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private http: HttpClient) {}

  getLastPayments(): Observable<ILastPayments[]> {
    return this.http.get<ILastPayments[]>(
      `${environment.BASE_URL}/payments/last-payments`
    )
  }
}
