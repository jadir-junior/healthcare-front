/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { render, screen } from '@testing-library/angular'

import { TableModule } from './table.module'
import { TableService } from './table.service'
import { TemplateModule } from 'src/app/directives/template/template.module'
import userEvent from '@testing-library/user-event'

const RESPONSE_PAGINATION_PAGE_1 = {
  'totalItems': 10,
  'itemCount': 5,
  'itemsPerPage': 5,
  'totalPages': 2,
  'currentPage': 1,
}

const RESPONSE_PRODUCTS_PAGE_1 = [
  {
    'id': '1003',
    'code': '244wgerg2',
    'name': 'Blue T-Shirt',
    'description': 'Product Description',
    'image': 'blue-t-shirt.jpg',
    'price': 29,
    'category': 'Clothing',
    'quantity': 25,
    'inventoryStatus': 'INSTOCK',
    'rating': 5,
  },
  {
    'id': '1008',
    'code': 'vbb124btr',
    'name': 'Game Controller',
    'description': 'Product Description',
    'image': 'game-controller.jpg',
    'price': 99,
    'category': 'Electronics',
    'quantity': 2,
    'inventoryStatus': 'LOWSTOCK',
    'rating': 4,
  },
  {
    'id': '1009',
    'code': 'cm230f032',
    'name': 'Gaming Set',
    'description': 'Product Description',
    'image': 'gaming-set.jpg',
    'price': 299,
    'category': 'Electronics',
    'quantity': 63,
    'inventoryStatus': 'INSTOCK',
    'rating': 3,
  },
  {
    'id': '1001',
    'code': 'nvklal433',
    'name': 'Black Watch',
    'description': 'Product Description',
    'image': 'black-watch.jpg',
    'price': 72,
    'category': 'Accessories',
    'quantity': 61,
    'inventoryStatus': 'INSTOCK',
    'rating': 4,
  },
  {
    'id': '1007',
    'code': 'mbvjkgip5',
    'name': 'Galaxy Earrings',
    'description': 'Product Description',
    'image': 'galaxy-earrings.jpg',
    'price': 34,
    'category': 'Accessories',
    'quantity': 23,
    'inventoryStatus': 'INSTOCK',
    'rating': 5,
  },
]

const RESPONSE_PRODUCTS_PAGE_2 = [
  {
    'id': '1005',
    'code': 'av2231fwg',
    'name': 'Brown Purse',
    'description': 'Product Description',
    'image': 'brown-purse.jpg',
    'price': 120,
    'category': 'Accessories',
    'quantity': 0,
    'inventoryStatus': 'OUTOFSTOCK',
    'rating': 4,
  },
  {
    'id': '1006',
    'code': 'bib36pfvm',
    'name': 'Chakra Bracelet',
    'description': 'Product Description',
    'image': 'chakra-bracelet.jpg',
    'price': 32,
    'category': 'Accessories',
    'quantity': 5,
    'inventoryStatus': 'LOWSTOCK',
    'rating': 3,
  },
  {
    'id': '1002',
    'code': 'zz21cz3c1',
    'name': 'Blue Band',
    'description': 'Product Description',
    'image': 'blue-band.jpg',
    'price': 79,
    'category': 'Fitness',
    'quantity': 2,
    'inventoryStatus': 'LOWSTOCK',
    'rating': 3,
  },
  {
    'id': '1004',
    'code': 'h456wer53',
    'name': 'Bracelet',
    'description': 'Product Description',
    'image': 'bracelet.jpg',
    'price': 15,
    'category': 'Accessories',
    'quantity': 73,
    'inventoryStatus': 'INSTOCK',
    'rating': 4,
  },
  {
    'id': '1000',
    'code': 'f230fh0g3',
    'name': 'Bamboo Watch',
    'description': 'Product Description',
    'image': 'bamboo-watch.jpg',
    'price': 65,
    'category': 'Accessories',
    'quantity': 24,
    'inventoryStatus': 'INSTOCK',
    'rating': 5,
  },
]

const COLUMNS = [
  {
    header: 'Code',
    field: 'code',
  },
  { header: 'Name', field: 'name' },
  { header: 'Category', field: 'category' },
  { header: 'Quantity', field: 'quantity' },
]

@Component({
  selector: 'hc-basic-table',
  template: `
    <hc-table hcData hcPagination [value]="products">
      <ng-template hcTemplate="header">
        <tr>
          <th
            *ngFor="let column of columns"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body">
        <tr *ngFor="let product of products" aria-label="row">
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>
    </hc-table>
  `,
  providers: [TableService],
})
class BasicTableComponent {
  products = RESPONSE_PRODUCTS_PAGE_1
  columns = COLUMNS
}

@Component({
  selector: 'hc-gridlines-table',
  template: `
    <hc-table hcData hcPagination [value]="products">
      <ng-template hcTemplate="caption">Header</ng-template>

      <ng-template hcTemplate="header">
        <tr>
          <th
            *ngFor="let column of columns"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body">
        <tr *ngFor="let product of products" aria-label="row">
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>

      <ng-template hcTemplate="summary">Footer</ng-template>
    </hc-table>
  `,
  providers: [TableService],
})
class GridlinesTableComponent {
  products = RESPONSE_PRODUCTS_PAGE_1
  columns = COLUMNS
}

@Component({
  selector: 'hc-pagination-table',
  template: `
    <hc-table
      hcData
      hcPagination
      [value]="products"
      [paginator]="true"
      [pagination]="pagination"
      (pageEvent)="onChangePage($event)"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    >
      <ng-template hcTemplate="caption">Header</ng-template>

      <ng-template hcTemplate="header">
        <tr>
          <th
            *ngFor="let column of columns"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body">
        <tr *ngFor="let product of products" aria-label="row">
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>

      <ng-template hcTemplate="summary">Footer</ng-template>
    </hc-table>
  `,
  providers: [TableService],
})
class PaginationTableComponent implements OnInit {
  page = 1

  products: any[] = []
  pagination = {}
  columns = COLUMNS

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    if (this.page === 1) {
      this.products = RESPONSE_PRODUCTS_PAGE_1
      this.pagination = RESPONSE_PAGINATION_PAGE_1
    }

    if (this.page === 2) {
      this.products = RESPONSE_PRODUCTS_PAGE_2
      this.pagination = { ...RESPONSE_PAGINATION_PAGE_1, ...{ currentPage: 2 } }
    }
  }

  onChangePage(event: { page: number; pageCount: number; first: number; rows: number }) {
    this.page = event.page
    this.getProducts()
  }
}

describe('TableComponent', () => {
  const setupBasicTable = async () => {
    return render(BasicTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  const setupGridlinesTable = async () => {
    return render(GridlinesTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  const setupPaginationTable = async () => {
    return render(PaginationTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  it('should create a component', async () => {
    const { container } = await setupBasicTable()

    expect(container).toBeInTheDocument()
  })

  it('"BASIC TABLE" create a table basic with 5 rows', async () => {
    await setupBasicTable()

    expect(screen.getAllByLabelText(/column header/i).length).toBe(4)
    expect(screen.getByLabelText(/column header code/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/row/i).length).toBe(5)
  })

  it('"GRIDLINES TABLE" create a table with gridlines in caption and summary', async () => {
    await setupGridlinesTable()

    expect(screen.getByText(/header/i)).toBeInTheDocument()
    expect(screen.getByText(/footer/i)).toBeInTheDocument()
  })

  it('"PAGINATION TABLE" create a table with pagination and current report', async () => {
    await setupPaginationTable()

    expect(screen.getByLabelText(/pagination/i)).toBeInTheDocument()
    expect(screen.getByText(/showing 1 to 5 of 10 entries/i)).toBeInTheDocument()
  })

  it('"PAGINATION TABLE" create a table with pagination and change the page', async () => {
    await setupPaginationTable()

    expect(screen.getByLabelText(/pagination/i)).toBeInTheDocument()
    expect(screen.getByText(/showing 1 to 5 of 10 entries/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /page 2/i }))

    expect(screen.getByText(/av2231fwg/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /page 2/i })).toHaveClass(
      'hc-highlight-pagination'
    )
    expect(screen.getByText(/showing 6 to 10 of 10 entries/i))
  })
})
