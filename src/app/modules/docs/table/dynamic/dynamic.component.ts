import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { IColumn } from 'src/app/components/table/table.component'

@Component({
  selector: 'app-dynamic',
  template: `
    <div class="wrapper-container-docs">
      <hc-table hcData [columns]="cols" [value]="products" [responsive]="true"></hc-table>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
})
export class DynamicComponent implements OnInit {
  products: IProduct[] = []
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
      .subscribe((response) => (this.products = response.items))
  }
}
