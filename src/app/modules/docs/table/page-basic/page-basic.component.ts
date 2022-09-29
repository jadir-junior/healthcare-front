import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

@Component({
  selector: 'app-page-basic',
  template: `
    <div class="hc-docs-title">
      <h2>Table Basic</h2>
      <p class="body1">DataTable é uma coleção que exibe colunas com dados</p>
    </div>
    <div class="hc-docs-components">
      <hc-card *ngIf="products.length">
        <hc-table [value]="products" [responsive]="true">
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
    </div>
    <h4 class="hc-docs-documentaion">Documentação</h4>
    <div class="hc-docs-section">
      <h5>Import:</h5>
      <markdown src="/assets/docs/table/common/import.ts"></markdown>
    </div>
    <div class="hc-docs-section">
      <h5>Codigo:</h5>
      <markdown src="/assets/docs/table/basic/basic.html"></markdown>
      <markdown src="/assets/docs/table/basic/component.ts"></markdown>
    </div>
  `,
})
export class PageBasicComponent implements OnInit {
  products: IProduct[] = []

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
    })
  }
}
