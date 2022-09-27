import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { IAccessKey } from '../../../../models/access-key.model'
import { IColumn } from 'src/app/components/table/table.component'

interface IProductDynamic extends IProduct, IAccessKey {}

@Component({
  selector: 'app-dynamic',
  template: `
    <hc-card>
      <hc-table
        hcData
        hcPagination
        [columns]="cols"
        [value]="products"
        [responsive]="true"
      >
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns">
              {{ column.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-rowData let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">
              {{ rowData[col.field] }}
            </td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
})
export class DynamicComponent implements OnInit {
  products: IProductDynamic[] = []
  cols: IColumn[] = [
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
