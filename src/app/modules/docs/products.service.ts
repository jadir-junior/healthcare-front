import { HttpClient } from '@angular/common/http'
import { IPagination } from 'src/app/models/pagination.model'
import { Injectable } from '@angular/core'
import { MswService } from 'src/app/components/msw/msw.service'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { stringify } from 'query-string'

export interface IProduct {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private mswService: MswService) {}

  url = this.mswService.getMockServiceWorkerLocalStorage()
    ? environment.BASE_URL_MOCK_SERVICE_WORKER
    : environment.BASE_URL

  getProducts(
    page: number,
    limit: number,
    sortColumn?: string,
    sortDirection?: string
  ): Observable<IPagination<IProduct>> {
    const query = stringify(
      { page, limit, sortColumn, sortDirection },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    )

    return this.http.get<IPagination<IProduct>>(`${this.url}/products?${query}`)
  }
}