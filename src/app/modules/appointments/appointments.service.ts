import { Observable, map } from 'rxjs'
import { format, parseISO } from 'date-fns'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment'

export interface ILastPatients {
  id: string
  name: string
  photo: string
  visitTime: string
  date: string
}

interface IResponseILastPatients {
  id: string
  name: string
  visitTime: Date
  date: Date
  photo: string
}

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  getLastPatients(): Observable<ILastPatients[]> {
    return this.http
      .get<IResponseILastPatients[]>(`${environment.BASE_URL}/last-patients`)
      .pipe(
        map((patients) => {
          console.log(patients[0].visitTime)
          return patients.map((patient) => ({
            id: patient.id,
            name: patient.name,
            photo: patient.photo,
            visitTime: format(parseISO(String(patient.visitTime)), 'hh:mm'),
            date: format(parseISO(String(patient.date)), 'dd/MM/yyyy'),
          }))
        })
      )
  }
}
