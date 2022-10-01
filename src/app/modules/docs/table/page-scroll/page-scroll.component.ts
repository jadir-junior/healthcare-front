import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from './../../products.service'

import { IColumn } from './../../../../components/table/table.component'

@Component({
  selector: 'app-page-scroll',
  template: `
    <hc-card>
      <h6 style="margin-bottom: 1rem">Vertical</h6>
      <hc-table
        [value]="products"
        [columns]="cols"
        [scrollable]="true"
        scrollDirection="horizontal"
      >
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns" style="width: 200px">
              {{ column.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product let-columns="columns">
          <tr>
            <td *ngFor="let column of columns" style="width: 200px">
              {{ product[column.field] }}
            </td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>

    <hc-card [style]="{ 'margin-top': '1rem' }">
      <h6 style="margin-bottom: 1rem">Horizontal</h6>
      <hc-table
        [value]="products"
        [columns]="cols"
        [scrollable]="true"
        scrollDirection="vertical"
        responsiveLayout="scroll"
        scrollHeight="480px"
      >
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns">
              {{ column.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product let-columns="columns">
          <tr>
            <td *ngFor="let column of columns">
              {{ product[column.field] }}
            </td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>

    <hc-card [style]="{ 'margin-top': '1rem' }">
      <h6 style="margin-bottom: 1rem">Vertial e Horizontal</h6>
      <hc-table
        [value]="products"
        [columns]="cols"
        [scrollable]="true"
        scrollDirection="both"
        responsiveLayout="scroll"
        scrollHeight="480px"
      >
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns">
              {{ column.header }}
            </th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product let-columns="columns">
          <tr>
            <td *ngFor="let column of columns">
              {{ product[column.field] }}
            </td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
  styles: [],
})
export class PageScrollComponent implements OnInit {
  products: IProduct[] = []
  cols: IColumn[] = [
    { header: 'ID', field: 'id' },
    { header: 'Code', field: 'code' },
    { header: 'Name', field: 'name' },
    { header: 'Description', field: 'description' },
    { header: 'Price', field: 'price' },
    { header: 'Category', field: 'category' },
    { header: 'Quantity', field: 'quantity' },
    { header: 'Inventory Status', field: 'inventoryStatus' },
    { header: 'Rating', field: 'rating' },
  ]

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productsService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
    })
  }
}
