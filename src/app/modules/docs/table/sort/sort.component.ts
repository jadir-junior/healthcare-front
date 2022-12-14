import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { BaseTableService } from 'src/app/common/base-table/base-table.service'

@Component({
  selector: 'app-sort',
  template: `
    <hc-card>
      <hc-table
        hcSort
        responsiveLayout="scroll"
        [value]="products"
        [responsive]="true"
        (sortEvent)="onSort($event)"
        [sortField]="baseTableService.sortColumn"
        [sortOrder]="baseTableService.sortDirection"
      >
        <ng-template hcTemplate="header">
          <tr>
            <th hcSortableColumn="code">
              Code <hc-sort-icon field="code"></hc-sort-icon>
            </th>
            <th hcSortableColumn="name">
              Name <hc-sort-icon field="name"></hc-sort-icon>
            </th>
            <th hcSortableColumn="category">
              Category <hc-sort-icon field="category"></hc-sort-icon>
            </th>
            <th hcSortableColumn="quantity">
              Quantity <hc-sort-icon field="quantity"></hc-sort-icon>
            </th>
            <th hcSortableColumn="price">
              Price <hc-sort-icon field="price"></hc-sort-icon>
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product>
          <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
  providers: [BaseTableService],
})
export class SortComponent implements OnInit {
  products: IProduct[] = []

  constructor(
    private productsService: ProductsService,
    public baseTableService: BaseTableService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService
      .getProducts(
        this.baseTableService.page,
        this.baseTableService.limit,
        this.baseTableService.sortColumn,
        this.baseTableService.sortDirection
      )
      .subscribe((response) => (this.products = response.items))
  }

  onSort(event: { field: string; order: number }) {
    this.baseTableService.sort(event)
    this.getProducts()
  }
}
