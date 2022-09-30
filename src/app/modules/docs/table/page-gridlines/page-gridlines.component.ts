import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

@Component({
  selector: 'app-page-gridlines',
  template: `
    <div class="hc-docs-title">
      <h2>Table Gridlines</h2>
      <p class="body1">
        adicionando a propriedade <strong>gridlines</strong> exibir bordas entre as
        celulas
      </p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <hc-table hcData [value]="products" [responsive]="true" [gridlines]="true">
          <ng-template hcTemplate="caption"> Header </ng-template>
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
          <ng-template hcTemplate="summary"> Footer </ng-template>
        </hc-table>
      </hc-card>
    </div>
    <h4 class="hc-docs-documentation">Documentação</h4>
    <div class="hc-docs-section">
      <h5>Import:</h5>
      <markdown src="/assets/docs/table/common/import.ts"></markdown>
    </div>
    <div class="hc-docs-section">
      <h5>Codigo:</h5>
      <markdown src="/assets/docs/table/gridlines/gridlines.html"></markdown>
      <markdown src="/assets/docs/table/gridlines/component.ts"></markdown>
    </div>
  `,
})
export class PageGridlinesComponent implements OnInit {
  products: IProduct[] = []

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService
      .getProducts(1, 10)
      .subscribe((response) => (this.products = response.items))
  }
}
