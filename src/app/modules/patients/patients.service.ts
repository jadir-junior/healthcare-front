import { HttpClient } from '@angular/common/http'
import { IPagination } from 'src/app/models/pagination.model'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { stringify } from 'query-string'

export interface IPatient {
  id: string
  name: string
  email: string
  address: string
  phone: string
  age: number
  status: string
}

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  create(patient: Omit<IPatient, 'id'>): Observable<IPatient> {
    return this.http.post<IPatient>(`${environment.BASE_URL}/patients`, patient)
  }

  findAll(
    page: number,
    limit: number,
    sortDirection?: 'ASC' | 'DESC',
    sortColumn?: string
  ): Observable<IPagination<IPatient>> {
    const query = stringify(
      { page, limit, sortDirection, sortColumn },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    return this.http.get<IPagination<IPatient>>(
      `${environment.BASE_URL}/patients?${query}`
    )
  }
}
