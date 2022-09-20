import { Component, OnInit } from '@angular/core'
import {
  IPageChange,
  IPagination,
} from 'src/app/components/pagination/pagination.component'

import { ProductsService } from '../../products.service'

@Component({
  selector: 'app-page-pagination',
  template: `
    <div class="wrapper-container-docs">
      <div class="wrapper-card-docs" style="margin-bottom: 32px;">
        <h4>Basic</h4>
        <p class="body1" style="margin-bottom: 16px;">
          Essa é uma paginação sem lado do servidor ou com uma request sem controle de
          paginação do lado do servidor
        </p>
        <hc-pagination
          [rows]="basicPagination.itemsPerPage"
          [totalRecords]="basicPagination.totalItems"
        ></hc-pagination>
      </div>

      <div class="wrapper-card-docs" style="margin-bottom: 32px">
        <h4>Server Side</h4>
        <p class="body" style="margin-bottom: 16px;">
          paginação com controle do servidor
        </p>
        <hc-pagination
          [pagination]="serverSidePagination"
          (pageChangeEvent)="onPageChange($event)"
        ></hc-pagination>
      </div>

      <div class="wrapper-card-docs" style="margin-bottom: 32px">
        <h4>Show current Page</h4>
        <p class="body" style="margin-bottom: 16px;">
          mostra a pagina currente no lado direito
        </p>
        <hc-pagination
          [rows]="basicPagination.itemsPerPage"
          [totalRecords]="basicPagination.totalItems"
          [showCurrentPageReport]="true"
          currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} linhas"
        ></hc-pagination>
      </div>
    </div>
  `,
  styles: [],
})
export class PagePaginationComponent implements OnInit {
  page = 1
  limit = 5

  basicPagination: IPagination = {
    currentPage: 1,
    itemCount: 5,
    itemsPerPage: 5,
    totalItems: 35,
    totalPages: 7,
  }

  serverSidePagination: IPagination = {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.productsService.getProducts(this.page, this.limit).subscribe((response) => {
      this.serverSidePagination = response.meta
    })
  }

  onPageChange(event: IPageChange) {
    this.page = event.page
    this.limit = event.rows
    this.getProducts()
  }
}
