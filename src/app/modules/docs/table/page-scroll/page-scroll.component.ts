import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from './../../products.service'

import { IColumn } from './../../../../components/table/table.component'

@Component({
  selector: 'app-page-scroll',
  template: `
    <div class="hc-docs-title">
      <h2>DataTable Scroll</h2>
      <p class="body1">
        Scrollable é habilitado para rolar na tabela em vertical, hotizontal ou os dois
        "<i class="hc-docs-value">both</i>"
      </p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <h6 style="margin-bottom: 1rem">Horizontal</h6>
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
        <h6 style="margin-bottom: 1rem">Vertical</h6>
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
        <h6 style="margin-bottom: 1rem">Vertical e Horizontal</h6>
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
    </div>
    <h4 class="hc-docs-section">Documentação</h4>

    <div class="hc-docs-section">
      <h5>Import</h5>
      <markdown src="/assets/docs/table/common/import.ts"></markdown>
    </div>
    <div class="hc-docs-section">
      <h5>Codigo:</h5>
      <p class="body1">
        Use o atributo <i class="hc-docs-value">[scrollable]</i> para todos os tipo de
        direção e o <i class="hc-docs-value">[sortDirection]</i> para direção desejada
      </p>
      <markdown src="/assets/docs/table/scroll/scroll.html"></markdown>
      <markdown src="/assets/docs/table/scroll/component.ts"></markdown>
    </div>

    <div class="hc-docs-section">
      <h5>Propriedades:</h5>
      <hc-table [value]="props" [columns]="colsProps">
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let column of columns">{{ column.header }}</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-prop let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">{{ prop[col.field] }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </div>
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

  colsProps: IColumn[] = [
    { header: 'Name', field: 'name' },
    { header: 'Type', field: 'type' },
    { header: 'Default', field: 'default' },
    { header: 'Description', field: 'description' },
  ]

  props = [
    {
      name: 'scrollable',
      type: 'boolean',
      default: 'false',
      description: 'Para tornar a table scrollable',
    },
    {
      name: 'scrollDirection',
      type: 'vertical | horizontal | both',
      default: 'both',
      description: 'Escholhe a direção do scroll',
    },
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
