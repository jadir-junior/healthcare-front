import { environment } from 'src/environments/environment'
import { getProducts } from './products'
import { rest } from 'msw'

export const handlers = [rest.get(`${environment.BASE_URL}/products`, getProducts)]
