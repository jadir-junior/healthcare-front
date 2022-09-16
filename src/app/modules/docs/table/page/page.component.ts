import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { ActivatedRoute } from '@angular/router'
import { BaseTableService } from 'src/app/common/base-table/base-table.service'
import { IMeta } from 'src/app/models/pagination.model'

@Component({
  selector: 'app-page',
  template: `
    <div class="wrapper-container-docs" *ngIf="products && pagination">
      <hc-table
        [value]="products"
        [responsive]="true"
        [paginator]="true"
        [rows]="baseTableService.limit"
        [totalRecords]="pagination.totalItems"
        (pageChangeEvent)="baseTableService.changePage($event)"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <ng-template hcTemplate="header">
          <tr>
            <th>id</th>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Inventory Status</th>
            <th>Rating</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body">
          <tr *ngFor="let product of products">
            <td>{{ product.id }}</td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price | currency: 'USD' }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.inventoryStatus }}</td>
            <td>{{ product.rating }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
  providers: [BaseTableService],
})
export class PageComponent implements OnInit {
  products: IProduct[] = []
  pagination!: IMeta

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
}
