import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from './../../products.service'

import { BaseTableService } from 'src/app/common/base-table/base-table.service'

@Component({
  selector: 'app-page-toggle',
  template: `
    <hc-card>
      <div
        style="display: flex; justify-content: flex-end; width: 100%; margin-bottom: 1rem"
      >
        <hc-button
          icon="more_vert"
          theme="text"
          (click)="dropdown.toggle($event)"
        ></hc-button>
        <hc-dropdown #dropdown [style]="{ width: '160px' }">
          <ng-template hcTemplate>
            <div *ngFor="let col of baseTableService.cols" style="margin: 1rem 1rem;">
              <hc-checkbox
                [(ngModel)]="baseTableService.selectedColumns"
                name="groupproducts"
                [value]="col"
                [label]="col.header"
              ></hc-checkbox>
            </div>
          </ng-template>
        </hc-dropdown>
      </div>
      <hc-table
        hcData
        hcPagination
        hcSort
        [columns]="baseTableService.selectedColumns"
        [value]="products"
        [responsive]="true"
      >
        <ng-template hcTemplate="header" let-columns>
          <tr>
            <th *ngFor="let col of columns">{{ col.header }}</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body" let-product let-columns="columns">
          <tr>
            <td *ngFor="let col of columns">{{ product[col.field] }}</td>
          </tr>
        </ng-template>
      </hc-table>
    </hc-card>
  `,
  providers: [BaseTableService],
})
export class PageToggleComponent implements OnInit {
  products: IProduct[] = []

  constructor(
    private productsService: ProductsService,
    public baseTableService: BaseTableService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts(1, 10).subscribe((response) => {
      this.products = response.items
      this.baseTableService.cols = [
        { header: 'Code', field: 'code' },
        { header: 'Name', field: 'name' },
        { header: 'Category', field: 'category' },
        { header: 'Quantity', field: 'quantity' },
      ]
      this.baseTableService._selectedColumns = this.baseTableService.cols
    })
  }
}
