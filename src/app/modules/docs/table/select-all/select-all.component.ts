import { Component, OnInit } from '@angular/core'
import { IProduct, ProductsService } from '../../products.service'

import { ActivatedRoute } from '@angular/router'
import { BaseTableService } from 'src/app/common/base-table/base-table.service'
import { IHeaderCheckboxEvent } from 'src/app/components/table/select.directive'
import { IMeta } from 'src/app/models/pagination.model'

@Component({
  selector: 'app-select-all',
  template: `
    <div class="wrapper-container-docs" *ngIf="products && pagination">
      <div style="margin-bottom: 8px;">
        <hc-select-all
          *ngIf="selectedProducts?.length || selectAll"
          [selected]="selectedProducts"
          [deselected]="desSelectedProdutcs"
          [totalItems]="pagination.totalItems"
          [selectAll]="selectAll"
          (clickEvent)="onSelectAll()"
        ></hc-select-all>
      </div>
      <hc-table
        hcSelect
        hcData
        hcPagination
        dataKey="code"
        [value]="products"
        [responsive]="true"
        [selectionPageOnly]="true"
        [paginator]="true"
        [pagination]="pagination"
        (pageEvent)="baseTableService.changePage($event)"
        [rows]="baseTableService.limit"
        [totalRecords]="pagination.totalItems"
        [(selection)]="selectedProducts"
        [(deselection)]="desSelectedProdutcs"
        [selectAll]="selectAll"
        (selectAllChange)="onSelectAllChange($event)"
      >
        <!-- [lazy]="true" -->
        <ng-template hcTemplate="header">
          <tr>
            <th>
              <hc-table-header-checkbox
                ariaLabel="checkbox header"
              ></hc-table-header-checkbox>
            </th>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </ng-template>
        <ng-template hcTemplate="body">
          <tr *ngFor="let product of products">
            <td>
              <hc-table-check-box
                [value]="product"
                [ariaLabel]="'checkbox-' + product.id"
              ></hc-table-check-box>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.quantity }}</td>
          </tr>
        </ng-template>
      </hc-table>
      <button (click)="onShow()">Show</button>
    </div>
  `,
  providers: [BaseTableService],
  styleUrls: ['../../docs/docs.component.scss'],
})
export class SelectAllComponent implements OnInit {
  products: IProduct[] = []
  pagination!: IMeta

  selectAll: boolean | null = null

  checked!: boolean

  selectedProducts!: IProduct[]

  desSelectedProdutcs: IProduct[] = []

  constructor(
    private productsService: ProductsService,
    public baseTableService: BaseTableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.getProducts()
    })
  }

  onSelectAll() {
    this.selectAll = !this.selectAll
  }

  getProducts(): void {
    this.productsService
      .getProducts(
        this.baseTableService.page,
        this.baseTableService.limit,
        this.baseTableService.sortColumn,
        this.baseTableService.sortDirection
      )
      .subscribe((response) => {
        this.products = response.items
        this.pagination = response.meta
      })
  }

  onSelectAllChange(event: IHeaderCheckboxEvent) {
    this.checked = event.checked

    if (this.checked) {
      this.getProducts()
    }
  }

  onShow() {
    console.log(this.desSelectedProdutcs)
  }
}
