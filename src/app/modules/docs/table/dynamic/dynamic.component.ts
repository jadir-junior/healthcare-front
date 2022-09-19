/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { IColumn } from 'src/app/components/table/table.component'

interface AccessProduct {
  [key: string]: string | number
}

interface IProductDynamic extends IProduct, AccessProduct {}

@Component({
  selector: 'app-dynamic',
  template: `
    <div class="wrapper-container-docs">
      <hc-table hcData hcPagination [value]="products" [responsive]="true">
        <ng-template hcTemplate="header">
          <tr>
            <th *ngFor="let column of columns">
              {{ column.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body">
          <tr *ngFor="let product of products">
            <td *ngFor="let column of columns">
              {{ product[column.field] }}
            </td>
          </tr>
        </ng-template>
      </hc-table>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
})
export class DynamicComponent implements OnInit {
  products: IProductDynamic[] = []
  columns: IColumn[] = [
    { header: 'Code', field: 'code' },
    { header: 'Name', field: 'name' },
    { header: 'Category', field: 'category' },
    { header: 'Quantity', field: 'quantity' },
  ]

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProducts(1, 10)
      .subscribe((response) => (this.products = response.items as IProductDynamic[]))
  }
}
