import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from './../../products.service'

import { IColumn } from 'src/app/components/table/table.component'

@Component({
  selector: 'app-page-row-expand',
  template: `
    <hc-card>
      <hc-table hcRowExpand [value]="products" dataKey="code" [columns]="cols">
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th style="width: 2rem;"></th>
            <th *ngFor="let column of columns">{{ column.header }}</th>
          </tr>
        </ng-template>
        <ng-template
          hcTemplate="body"
          let-product
          let-columns="columns"
          let-expanded="expanded"
        >
          <tr>
            <td>
              <hc-button
                size="small"
                theme="text"
                [hcRowToggler]="product"
                [icon]="expanded ? 'expand_less' : 'expand_more'"
              ></hc-button>
            </td>
            <td *ngFor="let column of columns">{{ product[column.field] }}</td>
          </tr>
        </ng-template>
        <ng-template hcTemplate="rowexpansion" let-product>
          <td colspan="5">
            <div class="hc-wrapper-row-expansion">
              <h4>Row expanded - {{ product.code }}! ;D</h4>
            </div>
          </td>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
  styles: [
    `
      .hc-wrapper-row-expansion {
        padding: 1.5rem;
        display: flex;
        justify-content: center;
        width: 100%;
        background-color: var(--neutral-divider);
      }
    `,
  ],
})
export class PageRowExpandComponent implements OnInit {
  products: IProduct[] = []
  cols: IColumn[] = [
    {
      header: 'Code',
      field: 'code',
    },
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Category',
      field: 'category',
    },
    {
      header: 'Quantity',
      field: 'quantity',
    },
  ]

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
    })
  }
}
