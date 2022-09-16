import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { BaseTableService } from 'src/app/common/base-table/base-table.service'
import { IPageChange } from 'src/app/components/pagination/pagination.component'

@Component({
  selector: 'app-page',
  template: `
    <div class="wrapper-container-docs">
      <hc-table [value]="products" [responsive]="true">
        <ng-template hcTemplate="header">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body">
          <tr *ngFor="let product of products">
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </hc-table>
      <hc-pagination
        [rows]="10"
        [totalRecords]="100"
        (pageChangeEvent)="onChangePage($event)"
      ></hc-pagination>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
  providers: [BaseTableService],
})
export class PageComponent implements OnInit {
  products: IProduct[] = []

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
      })
  }

  onChangePage(changePage: IPageChange) {
    console.log(changePage)
  }
}
