import { HttpClient } from '@angular/common/http'
import { IPagination } from 'src/app/models/pagination.model'
import { Injectable } from '@angular/core'
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
  constructor(private http: HttpClient) {}

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

    return this.http.get<IPagination<IProduct>>(
      `${environment.BASE_URL}/products?${query}`
    )
  }
}
