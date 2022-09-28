import { environment } from 'src/environments/environment'
import { getLastPatients } from './last-patitents'
import { getLastPayments } from './last-payments'
import { getProducts } from './products'
import { login } from './authentication'
import { profile } from './user'
import { rest } from 'msw'

export const handlers = [
  rest.get(`${environment.BASE_URL}/products`, getProducts),
  rest.post(`${environment.BASE_URL}/login`, login),
  rest.get(`${environment.BASE_URL}/last-patients`, getLastPatients),
  rest.get(`${environment.BASE_URL}/payments/last-payments`, getLastPayments),
  rest.get(`${environment.BASE_URL}/user/profile`, profile),
]
