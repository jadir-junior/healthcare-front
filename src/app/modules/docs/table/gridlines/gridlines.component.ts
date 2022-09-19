import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

@Component({
  selector: 'app-gridlines',
  template: `
    <div class="wrapper-container-docs">
      <hc-table hcData hcPagination [responsive]="true">
        <ng-template hcTemplate="caption"> Header </ng-template>

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

        <ng-template hcTemplate="summary"> Footer </ng-template>
      </hc-table>
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
})
export class GridlinesComponent implements OnInit {
  products: IProduct[] = []

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProducts(1, 10)
      .subscribe((response) => (this.products = response.items))
  }
}
