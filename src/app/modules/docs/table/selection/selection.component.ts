import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { BaseTableService } from 'src/app/common/base-table/base-table.service'
import { IMeta } from 'src/app/models/pagination.model'

@Component({
  selector: 'app-selection',
  template: `
    <div class="wrapper-container-docs">
      <hc-table
        [value]="products"
        [responsive]="true"
        [(selection)]="selectedProducts"
        [rowSelectable]="isRowSelectable"
        dataKey="code"
      >
        <ng-template hcTemplate="header">
          <tr>
            <th>
              <hc-table-header-checkbox></hc-table-header-checkbox>
            </th>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body">
          <tr *ngFor="let product of products">
            <td>
              <hc-table-check-box
                [value]="product"
                [disabled]="isInStock(product)"
              ></hc-table-check-box>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </hc-table>
      <button type="button" (click)="showSelectedProducts()">Show</button>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
  providers: [BaseTableService],
})
export class SelectionComponent implements OnInit {
  products: IProduct[] = []
  pagination!: IMeta

  selectedProducts: IProduct[] = []

  constructor(
    private productsService: ProductsService,
    public baseTableService: BaseTableService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productsService
      .getProducts(
        this.baseTableService.page,
        this.baseTableService.limit,
        this.baseTableService.sortColumn,
        this.baseTableService.sortDirection
      )
      .subscribe((response) => {
        this.products = response.items
        this.pagination = response.meta
      })
  }

  showSelectedProducts() {
    console.log(this.selectedProducts)
  }

  isRowSelectable(event: { data: IProduct; index: number }) {
    // return !this.isInStock(event.data)
    if (event.data.quantity < 5) {
      return false
    }
    return true
    // return !event.data.quantity < 5
  }

  isInStock(data: IProduct): boolean {
    return data.quantity < 5
  }
}
