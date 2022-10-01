import { COLUMNS, RESPONSE_PRODUCTS_PAGE_1 } from './table-data.mock'
import { Component, Input, OnInit } from '@angular/core'
import { render, screen } from '@testing-library/angular'

import { IProduct } from './../../modules/docs/products.service'
import { TableModule } from './table.module'
import { TableService } from './table.service'
import { TemplateModule } from '../../directives/template/template.module'
import userEvent from '@testing-library/user-event'

@Component({
  selector: 'hc-sort-table',
  template: `
    <hc-table
      hcSort
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

  products: IProduct[] = []
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

  onSort(event: { field: string; order: number }): void {
    this.getProducts(event)
  }
}

describe('Table Sort Component', () => {
  const setup = async () => {
    return render(SortTableComponent, {
      imports: [TableModule, TemplateModule],
    })
  }

  it('"SORT TABLE" create a sort table with initial state', async () => {
    await setup()
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
  })

  it('"SORT TABLE" create a sort table and when click on column header must be ascending', async () => {
    const { fixture } = await setup()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.click(columnHeaderCode)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'ascending')
    expect(columnHeaderCode).toHaveClass('hc-datatable-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc--datatable-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-datatable-highlight')
    expect(onSortSpy).toHaveBeenCalledWith({ field: 'code', order: 1 })
  })

  it('"SORT TABLE" create a sort table and when click on column header twice must be descending', async () => {
    const { fixture } = await setup()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.click(columnHeaderCode)
    await userEvent.click(columnHeaderCode)

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'descending')
    expect(columnHeaderCode).toHaveClass('hc-datatable-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-datatable-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-datatable-highlight')
    expect(onSortSpy).toHaveBeenCalledWith({ field: 'code', order: -1 })
  })

  it('"SORT TABLE" create a sort table and when tab and press enter must be sort', async () => {
    const { fixture } = await setup()
    const component = fixture.componentInstance
    const onSortSpy = jest.spyOn(component, 'onSort')
    const columnHeaderCode = screen.getByLabelText(/column header code/i)
    const columnHeaderName = screen.getByLabelText(/column header name/i)
    const columnHeaderCategory = screen.getByLabelText(/column header category/i)

    await userEvent.tab()
    await userEvent.keyboard('{enter}')

    expect(columnHeaderCode).toHaveAttribute('aria-sort', 'ascending')
    expect(columnHeaderCode).toHaveClass('hc-datatable-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-datatable-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-datatable-highlight')
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
    expect(columnHeaderCode).toHaveClass('hc-datatable-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-datatable-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-datatable-highlight')
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
    expect(columnHeaderCode).toHaveClass('hc-datatable-highlight')
    expect(columnHeaderName).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderName).not.toHaveClass('hc-datatable-highlight')
    expect(columnHeaderCategory).toHaveAttribute('aria-sort', 'none')
    expect(columnHeaderCategory).not.toHaveClass('hc-datatable-highlight')
  })
})
