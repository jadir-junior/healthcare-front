/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core'
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

const selectAllPageAndGoToPage2 = async () => {
  const checkboxsPage1 = ['1009', '1003', '1001', '1007', '1008']
  const checkboxsPage2 = ['1006', '1004', '1000', '1005', '1002']
  const page2 = screen.getByRole('button', { name: /page 2/i })
  const checkboxHeader = screen.getByTestId(/checkbox header/i)

  expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')

  await userEvent.click(checkboxHeader)

  expect(screen.getByTestId(/select all component/i)).toBeInTheDocument()
  expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
    '5 rows this page selected.'
  )
  expect(screen.getByLabelText(/select all/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/select all/i)).toHaveTextContent(
    /select all the 10 rows/i
  )

  expect(checkboxHeader).toHaveAttribute('aria-checked', 'true')
  checkboxsPage1.forEach((row) => {
    expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute('aria-checked', 'true')
  })

  await userEvent.click(screen.getByLabelText(/select all/i))

  expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
    '10 rows this page selected.'
  )
  expect(screen.getByLabelText(/clear selected/i)).toBeInTheDocument()

  await userEvent.click(page2)

  expect(checkboxHeader).toHaveAttribute('aria-checked', 'true')
  checkboxsPage2.forEach((row) => {
    expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute('aria-checked', 'true')
  })

  return {
    checkboxsPage1,
    checkboxsPage2,
    checkboxHeader,
    page2,
  }
}

@Component({
  selector: 'hc-basic-table',
  template: `
    <hc-table hcData hcPagination [value]="products">
      <ng-template hcTemplate="header">
        <tr>
          <th aria-label="column header code">Code</th>
          <th aria-label="column header">Name</th>
          <th aria-label="column header">Category</th>
          <th aria-label="column header">Quantity</th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body" let-product>
        <tr aria-label="row">
          <td>
            {{ product.code }}
          </td>
          <td>
            {{ product.name }}
          </td>
          <td>
            {{ product.category }}
          </td>
          <td>
            {{ product.quantity }}
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
      <ng-template hcTemplate="body" let-product>
        <tr aria-label="row">
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>
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

@Component({
  selector: 'hc-sort-table',
  template: `
    <hc-table
      hcData
      hcSort
      hcPagination
      [value]="products"
      (sortEvent)="onSort($event)"
      [sortField]="sortField"
      [sortOrder]="sortOrder"
    >
      <ng-template hcTemplate="header">
        <tr>
          <th
            *ngFor="let column of columns"
            [hcSortableColumn]="column.field"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
            <hc-sort-icon [field]="column.field"></hc-sort-icon>
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
class SortTableComponent implements OnInit {
  @Input() sortField: string | undefined = undefined
  @Input() sortOrder: string | undefined = undefined

  products: any[] = []
  columns = COLUMNS

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(sort?: { field: string; order: number }): void {
    this.products = RESPONSE_PRODUCTS_PAGE_1
    if (sort) {
      this.sortField = sort?.field
      this.sortOrder = sort?.order === 1 ? 'ASC' : 'DESC'
    }
  }

  onSort(event: { field: string; order: number }) {
    this.getProducts(event)
  }
}

@Component({
  selector: 'hc-selection-table',
  template: `
    <hc-table
      hcSelect
      hcData
      hcPagination
      dataKey="code"
      [value]="products"
      [paginator]="true"
      [pagination]="pagination"
      (pageEvent)="onChangePage($event)"
      [(selection)]="selectProducts"
      [rowSelectable]="isRowSelectable"
      [selectionPageOnly]="true"
    >
      <ng-template hcTemplate="header">
        <tr>
          <th>
            <hc-table-header-checkbox
              ariaLabel="Checkbox Header"
            ></hc-table-header-checkbox>
          </th>
          <th
            *ngFor="let column of columns"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body" let-product>
        <tr aria-label="row">
          <td>
            <hc-table-check-box
              [value]="product"
              [disabled]="isInStock(product)"
              [ariaLabel]="'checkbox-' + product.id"
            ></hc-table-check-box>
          </td>
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>
    </hc-table>
  `,
  providers: [TableService],
})
class SelectionTableComponent implements OnInit {
  page = 1

  products: any[] = []
  pagination = {}
  columns = COLUMNS

  selectedProducts = []

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

  isRowSelectable(event: { data: any; index: number }) {
    if (event.data?.quantity < 5) {
      return false
    }
    return true
  }

  isInStock(data: any) {
    return data.quantity < 5
  }
}

@Component({
  selector: 'hc-select-all-table',
  template: `
    <hc-select-all
      *ngIf="selectedProducts?.length || selectAll"
      [selected]="selectedProducts"
      [deselected]="deselectedProducts"
      [totalItems]="pagination.totalItems"
      [selectAll]="selectAll"
      (clickEvent)="onSelectAll()"
    ></hc-select-all>
    <hc-table
      hcSelect
      hcData
      hcPagination
      dataKey="code"
      [value]="products"
      [paginator]="true"
      [pagination]="pagination"
      (pageEvent)="onChangePage($event)"
      [(selection)]="selectedProducts"
      [(deselection)]="deselectedProducts"
      [selectAll]="selectAll"
      (selectAllChange)="onSelectAllChange($event)"
    >
      <ng-template hcTemplate="header">
        <tr>
          <th>
            <hc-table-header-checkbox
              ariaLabel="Checkbox Header"
            ></hc-table-header-checkbox>
          </th>
          <th
            *ngFor="let column of columns"
            [attr.aria-label]="'Column header ' + column.header"
          >
            {{ column.header }}
          </th>
        </tr>
      </ng-template>
      <ng-template hcTemplate="body" let-product>
        <tr aria-label="row">
          <td>
            <hc-table-check-box
              [value]="product"
              [ariaLabel]="'checkbox-' + product.id"
            ></hc-table-check-box>
          </td>
          <td *ngFor="let column of columns">
            {{ product[column.field] }}
          </td>
        </tr>
      </ng-template>
    </hc-table>
  `,
  providers: [TableService],
})
class SelectAllTableComponent implements OnInit {
  page = 1
  selectAll: boolean | null = null
  checked!: boolean
  products: any[] = []
  pagination = {}
  columns = COLUMNS

  selectedProducts = []
  deselectedProducts = []

  ngOnInit(): void {
    this.getProducts()
  }

  onSelectAll() {
    this.selectedProducts = []
    this.selectAll = !this.selectAll
  }

  onSelectAllChange(event: { originalEvent: Event; checked: boolean }) {
    this.checked = event.checked

    if (this.checked) {
      this.getProducts()
    }
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

  const setupSortTable = async () => {
    return render(SortTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  const setupSelectionTable = async () => {
    return render(SelectionTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  const setupSelectAllTable = async () => {
    return render(SelectAllTableComponent, {
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

  it('"SORT TABLE" create a sort table with initial state', async () => {
    await setupSortTable()
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
  })

  it('"SORT TABLE" create a sort table and when click on column header must be ascending', async () => {
    const { fixture } = await setupSortTable()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.click(columnHeaderCode)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'ascending')
    expect(columnHeaderCode).toHaveClass('hc-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-highlight')
    expect(onSortSpy).toHaveBeenCalledWith({ field: 'code', order: 1 })
  })

  it('"SORT TABLE" create a sort table and when click on column header twice must be descending', async () => {
    const { fixture } = await setupSortTable()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.click(columnHeaderCode)
    await userEvent.click(columnHeaderCode)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'descending')
    expect(columnHeaderCode).toHaveClass('hc-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-highlight')
    expect(onSortSpy).toHaveBeenCalledWith({ field: 'code', order: -1 })
  })

  it('"SORT TABLE" create a sort table and when tab and press enter must be sort', async () => {
    const { fixture } = await setupSortTable()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.tab()
    await userEvent.keyboard('{enter}')

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'ascending')
    expect(columnHeaderCode).toHaveClass('hc-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-highlight')
    expect(onSortSpy).toHaveBeenCalledWith({ field: 'code', order: 1 })
  })

  it('"SORT TABLE" create a sort table and get query params of url and initial with inital values sortColumn "code" and sortDirection "ASC"', async () => {
    await render(SortTableComponent, {
      imports: [TableModule, TemplateModule],
      componentProperties: {
        sortField: 'code',
        sortOrder: 'ASC',
      },
    })
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'ascending')
    expect(columnHeaderCode).toHaveClass('hc-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-highlight')
  })

  it('"SORT TABLE" create a sort table and get query params of url and initial with inital values sortColumn "code" and sortDirection "DESC"', async () => {
    await render(SortTableComponent, {
      imports: [TableModule, TemplateModule],
      componentProperties: {
        sortField: 'code',
        sortOrder: 'DESC',
      },
    })
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'descending')
    expect(columnHeaderCode).toHaveClass('hc-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-highlight')
  })

  it('"SELECTION TABLE", create a selection table with initial state', async () => {
    await setupSelectionTable()
    const checkboxHeader = screen.getByTestId(/checkbox header/i)
    const checkboxRows = screen.getAllByTestId(/checkbox-/i)
    const checkboxDisabled = screen.getByLabelText(/checkbox-1008/i)

    expect(checkboxHeader).toBeInTheDocument()
    expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')
    expect(checkboxRows.length).toBe(5)
    checkboxRows.forEach((c) => {
      expect(c).toHaveAttribute('aria-checked', 'false')
    })
    expect(checkboxDisabled).toBeDisabled()
  })

  it('"SELECTION TABLE", create a selection table and select two rows', async () => {
    await setupSelectionTable()
    const checkbox1009 = screen.getByTestId(/checkbox-1009/i)
    const checkbox1003 = screen.getByTestId(/checkbox-1003/i)

    await userEvent.click(checkbox1003)
    await userEvent.click(checkbox1009)

    expect(checkbox1009).toHaveClass('hc-checkbox-highlight')
    expect(checkbox1003).toHaveClass('hc-checkbox-highlight')
    expect(checkbox1003).toHaveAttribute('aria-checked', 'true')
    expect(checkbox1003).toHaveAttribute('aria-checked', 'true')
  })

  it('"SELECTION TABLE", select all rows on the page without selected disabled', async () => {
    await setupSelectionTable()
    const checkboxsEnable = ['1009', '1003', '1001', '1007']
    const checkboxHeader = screen.getByTestId(/checkbox header/i)
    const checkbox1008Disabled = screen.getByTestId(/checkbox-1008/i)

    await userEvent.click(checkboxHeader)

    checkboxsEnable.forEach((c) => {
      expect(screen.getByTestId(`checkbox-${c}`)).toHaveAttribute('aria-checked', 'true')
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()
  })

  it('"SELECTION TABLE", select the checkbox header and deselect the checkbox header', async () => {
    await setupSelectionTable()
    const checkboxsEnable = ['1009', '1003', '1001', '1007']
    const checkboxHeader = screen.getByTestId(/checkbox header/i)
    const checkbox1008Disabled = screen.getByTestId(/checkbox-1008/i)

    await userEvent.click(checkboxHeader)

    checkboxsEnable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()

    await userEvent.click(checkboxHeader)

    checkboxsEnable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'false'
      )
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()
  })

  it('"SELECTION TABLE", select all rows in two pages without checkboxs disabled', async () => {
    await setupSelectionTable()
    const checkboxsPage1Enable = ['1009', '1003', '1001', '1007']
    const checkboxsPage2Enable = ['1006', '1004', '1000']
    const checkboxsPage2Disabled = ['1005', '1002']
    const checkboxHeader = screen.getByTestId(/checkbox header/i)
    const checkbox1008Disabled = screen.getByTestId(/checkbox-1008/i)
    const page2 = screen.getByRole('button', { name: /page 2/i })

    await userEvent.click(checkboxHeader)

    checkboxsPage1Enable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()

    await userEvent.click(page2)

    expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(checkboxHeader)
    checkboxsPage2Enable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    checkboxsPage2Disabled.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'false'
      )
    })
  })

  it('"SELECTION TABLE", select all rows in two pages without checkboxs disabled and return to page 1 and continued select', async () => {
    await setupSelectionTable()

    const checkboxsPage1Enable = ['1009', '1003', '1001', '1007']
    const checkboxsPage2Enable = ['1006', '1004', '1000']
    const checkboxsPage2Disabled = ['1005', '1002']
    const checkboxHeader = screen.getByTestId(/checkbox header/i)
    const checkbox1008Disabled = screen.getByTestId(/checkbox-1008/i)
    const page2 = screen.getByRole('button', { name: /page 2/i })

    await userEvent.click(checkboxHeader)

    checkboxsPage1Enable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()

    await userEvent.click(page2)

    expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')

    await userEvent.click(checkboxHeader)
    checkboxsPage2Enable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    checkboxsPage2Disabled.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'false'
      )
    })

    await userEvent.click(screen.getByRole('button', { name: /page 1/i }))

    checkboxsPage1Enable.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    expect(checkbox1008Disabled).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText(/checkbox-1008/i)).toBeDisabled()
  })

  it('"SELECT ALL TABLE", select all pages', async () => {
    await setupSelectAllTable()
  })

  it('"SELECT ALL TABLE", select all pages', async () => {
    await setupSelectAllTable()

    await selectAllPageAndGoToPage2()

    await userEvent.click(screen.getByTestId(/checkbox-1006/i))

    expect(screen.getByTestId(/checkbox-1006/i)).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '9 rows this page selected'
    )
  })

  it('"SELECT ALL TABLE" select deselect one row and select again', async () => {
    await setupSelectAllTable()

    await selectAllPageAndGoToPage2()

    await userEvent.click(screen.getByTestId(/checkbox-1006/i))

    expect(screen.getByTestId(/checkbox-1006/i)).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '9 rows this page selected'
    )

    await userEvent.click(screen.getByTestId(/checkbox-1006/i))

    expect(screen.getByTestId(/checkbox-1006/i)).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '10 rows this page selected'
    )
  })

  it('"SELECT ALL TABLE" select deselect with checkbox header', async () => {
    await setupSelectAllTable()

    const { checkboxsPage2, checkboxHeader } = await selectAllPageAndGoToPage2()

    await userEvent.click(checkboxHeader)

    expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')
    checkboxsPage2.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'false'
      )
    })
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '5 rows this page selected'
    )
  })

  it('"SELECT ALL TABLE" select deselect with checkbox header and select again', async () => {
    await setupSelectAllTable()

    const { checkboxsPage2, checkboxHeader } = await selectAllPageAndGoToPage2()

    await userEvent.click(checkboxHeader)

    expect(checkboxHeader).toHaveAttribute('aria-checked', 'false')
    checkboxsPage2.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'false'
      )
    })
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '5 rows this page selected'
    )

    await userEvent.click(checkboxHeader)

    expect(checkboxHeader).toHaveAttribute('aria-checked', 'true')
    checkboxsPage2.forEach((row) => {
      expect(screen.getByTestId(`checkbox-${row}`)).toHaveAttribute(
        'aria-checked',
        'true'
      )
    })
    expect(screen.getByTestId(/select all component/i)).toHaveTextContent(
      '10 rows this page selected'
    )
  })

  it('"SELECT ALL TABLE" select two pages and must be 10 rows', async () => {
    await setupSelectAllTable()

    await userEvent.click(screen.getByTestId(/checkbox header/i))

    expect(screen.getByTestId(/select all component/i)).toHaveTextContent('5 rows')

    await userEvent.click(screen.getByRole('button', { name: /page 2/i }))

    await userEvent.click(screen.getByTestId(/checkbox header/i))

    expect(screen.getByTestId(/select all component/i)).toHaveTextContent('10 rows')
  })
})
