import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from './../../../../environments/environment'

interface IEvents {
  title: string
  description: string
  date: Date
}
interface ISocialMedias {
  facebook: string
  instagram: string
  linkedin: string
  twitter: string
}

interface IAddress {
  number: number
  street: string
  state: string
  city: string
  cep: string
}

interface IContact {
  phone: string
  address: IAddress
}

interface IHistory {
  lastVisit: Date
}

export interface IProfile {
  name: string
  age: number
  gender: 'MALE' | 'FEMALE'
  profileBackgroundImage: string
  photo: string
  description: string
  contact: IContact
  socialMedias: ISocialMedias
  events: IEvents[]
  healthProblems: string[]
  status: 'APPROVED' | 'PENDING'
  history: IHistory[]
}

export interface IMe {
  name: string
  email: string
  photo: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<IProfile> {
    return this.http.get<IProfile>(`${environment.BASE_URL}/user/profile`)
  }

  getMe(): Observable<IMe> {
    return this.http.get<IMe>(`${environment.BASE_URL}/user/me`)
  }
}
