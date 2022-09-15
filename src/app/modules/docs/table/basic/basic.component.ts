import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

@Component({
  selector: 'app-basic',
  template: `
    <div class="wrapper-container-docs" *ngIf="products.length">
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
    </div>
  `,
  styleUrls: ['../../docs/docs.component.scss'],
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
