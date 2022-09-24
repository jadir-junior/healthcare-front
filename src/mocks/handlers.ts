import { environment } from 'src/environments/environment'
import { getProducts } from './products'
import { rest } from 'msw'
import { login } from './authentication'

export const handlers = [
  rest.get(`${environment.BASE_URL}/products`, getProducts),
  rest.post(`${environment.BASE_URL}/login`, login),
]
