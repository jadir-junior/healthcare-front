import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { ActivatedRoute } from '@angular/router'
import { BaseTableService } from 'src/app/common/base-table/base-table.service'
import { IMeta } from 'src/app/models/pagination.model'

@Component({
  selector: 'app-selection',
  template: `
    <hc-card>
      <hc-table
        hcSelect
        hcData
        hcPagination
        dataKey="code"
        [value]="products"
        [responsive]="true"
        [(selection)]="selectedProducts"
        [rowSelectable]="isRowSelectable"
        [selectionPageOnly]="true"
        [paginator]="true"
        [pagination]="pagination"
        (pageEvent)="baseTableService.changePage($event)"
      >
        <ng-template hcTemplate="header">
          <tr>
            <th>
              <hc-table-header-checkbox
                ariaLabel="checkbox header"
              ></hc-table-header-checkbox>
            </th>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product>
          <tr>
            <td>
              <hc-table-check-box
                [value]="product"
                [disabled]="isInStock(product)"
                [ariaLabel]="'checkbox-' + product.id"
              ></hc-table-check-box>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
    <button (click)="onShow()">show</button>
  `,
  providers: [BaseTableService],
})
export class SelectionComponent implements OnInit {
  products: IProduct[] = []
  pagination!: IMeta

  selectedProducts: IProduct[] = []

  constructor(
    private productsService: ProductsService,
    public baseTableService: BaseTableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.getProducts()
    })
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

  onShow() {
    console.log(this.selectedProducts)
  }

  isRowSelectable(event: { data: IProduct; index: number }) {
    if (event.data.quantity < 5) {
      return false
    }
    return true
  }

  isInStock(data: IProduct): boolean {
    return data.quantity < 5
  }
}
