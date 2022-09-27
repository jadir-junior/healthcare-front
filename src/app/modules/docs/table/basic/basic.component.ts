import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

@Component({
  selector: 'app-basic',
  template: `
    <hc-card *ngIf="products.length">
      <hc-table hcData hcPagination hcSort [value]="products" [responsive]="true">
        <ng-template hcTemplate="header">
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product>
          <tr>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
})
export class BasicComponent implements OnInit {
  products: IProduct[] = []

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
    })
  }
}
