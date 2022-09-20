import { render, screen } from '@testing-library/angular'

import { Component } from '@angular/core'
import { TableModule } from './table.module'
import { TableService } from './table.service'
import { TemplateModule } from 'src/app/directives/template/template.module'

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
  selector: 'hc-basic-gridlines',
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
})
