import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { IColumn } from 'src/app/components/table/table.component'

@Component({
  selector: 'app-page-dynamic',
  template: `
    <div class="hc-docs-title">
      <h2>Table Dynamic Columns</h2>
      <p class="body1">
        Colunas podem ser defenida dinamicamente usando a diretiva *ngFor
      </p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <hc-table [columns]="cols" [value]="products" [responsive]="true">
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
    </div>
    <h4 class="hc-docs-documentation">Documentação</h4>
    <div class="hc-docs-section">
      <h5>Import:</h5>
      <markdown src="/assets/docs/table/common/import.ts"></markdown>
    </div>
    <div class="hc-docs-section">
      <h5>Codigo:</h5>
      <markdown src="/assets/docs/table/dynamic/dynamic.html"></markdown>
      <markdown src="/assets/docs/table/dynamic/component.ts"></markdown>
    </div>
  `,
})
export class PageDynamicComponent implements OnInit {
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
