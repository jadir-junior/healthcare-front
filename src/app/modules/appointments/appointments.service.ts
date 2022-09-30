import { Observable, map } from 'rxjs'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

export interface ILastPatients {
  id: string
  name: string
  photo: string
  visitTime: Date
  date: Date
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  getLastPatients(): Observable<ILastPatients[]> {
    return this.http.get<ILastPatients[]>(`${environment.BASE_URL}/last-patients`).pipe(
      map((patients) => {
        return patients.map((patient) => ({
          id: patient.id,
          name: patient.name,
          photo: patient.photo,
          visitTime: patient.visitTime,
          date: patient.date,
        }))
      })
    )
  }
}
