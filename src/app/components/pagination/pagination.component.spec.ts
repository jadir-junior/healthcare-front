import { Component, OnInit } from '@angular/core'
import { IPageChange, IPagination, PaginationComponent } from './pagination.component'
import { render, screen } from '@testing-library/angular'

import { PaginationModule } from './pagination.module'
import userEvent from '@testing-library/user-event'

@Component({
  selector: 'hc-pagination-server-side',
  template: `
    <hc-pagination
      [pagination]="pagination"
      (pageChangeEvent)="onPageChange($event)"
    ></hc-pagination>
  `,
})
class PaginationServerSideComponent implements OnInit {
  page = 1

  pagination: IPagination = {
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 0,
  }

  ngOnInit(): void {
    this.getProducts()
  }

  onPageChange(event: IPageChange) {
    this.page = event.page
    this.getProducts()
  }

  getProducts(): void {
    if (this.page === 1) {
      this.pagination = {
        currentPage: 1,
        itemCount: 5,
        itemsPerPage: 5,
        totalItems: 10,
        totalPages: 2,
      }
    }

    if (this.page === 2) {
      this.pagination = {
        currentPage: 2,
        itemCount: 5,
        itemsPerPage: 5,
        totalItems: 10,
        totalPages: 2,
      }
    }
  }
}

describe('PaginationComponent', () => {
  const setup = async () => {
    return render(PaginationComponent, {
      componentProperties: {
        rows: 5,
        totalRecords: 15,
      },
    })
  }

  const setupCurrentPageReport = async () => {
    return render(PaginationComponent, {
      componentProperties: {
        rows: 5,
        totalRecords: 35,
        showCurrentPageReport: true,
        currentPageReportTemplate: 'Showing {first} to {last} of {totalRecords} entries',
      },
    })
  }

  const setupPaginationServerSide = async () => {
    return render(PaginationServerSideComponent, {
      imports: [PaginationModule],
    })
  }

  it('should create a component pagination', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
  })

  it('BASIC: create pagination with inital state', async () => {
    await setup()

    expect(screen.getByRole('button', { name: /button first page/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /button page to prev/i })).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /^page /i }).length).toBe(3)
    expect(screen.getByRole('button', { name: /page 1/i })).toHaveClass(
      'hc-highlight-pagination'
    )
    expect(screen.getByRole('button', { name: /page 2/i })).not.toHaveClass(
      'hc-highlight-pagination'
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /button page to next/i })
    ).not.toBeDisabled()
    expect(screen.getByRole('button', { name: /button last page/i })).not.toBeDisabled()
  })

  it('BASIC: when click in page 2 must change to page two', async () => {
    await setup()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(button2)

    expect(button2).toHaveClass('hc-highlight-pagination')
    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).not.toBeDisabled()
    expect(buttonLastPage).not.toBeDisabled()
  })

  it('BASIC: when click in button next page change to page 2', async () => {
    await setup()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const button3 = screen.getByRole('button', { name: /page 3/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(buttonPageToNext)

    expect(button2).toHaveClass('hc-highlight-pagination')
    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(button3).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).not.toBeDisabled()
    expect(buttonLastPage).not.toBeDisabled()
  })

  it('BASIC: when click in button to last page change to page 3', async () => {
    await setup()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const button3 = screen.getByRole('button', { name: /page 3/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(buttonLastPage)

    expect(button3).toHaveClass('hc-highlight-pagination')
    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(button2).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).toBeDisabled()
    expect(buttonLastPage).toBeDisabled()
  })

  it('BASIC: when click in button prev return to page 1', async () => {
    await setup()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const button3 = screen.getByRole('button', { name: /page 3/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(button2)
    await userEvent.click(buttonPageToPrev)

    expect(button3).not.toHaveClass('hc-highlight-pagination')
    expect(button1).toHaveClass('hc-highlight-pagination')
    expect(button2).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).toBeDisabled()
    expect(buttonPageToPrev).toBeDisabled()
    expect(buttonPageToNext).not.toBeDisabled()
    expect(buttonLastPage).not.toBeDisabled()
  })

  it('BASIC: when click in button first return to page 1', async () => {
    await setup()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const button3 = screen.getByRole('button', { name: /page 3/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(buttonLastPage)
    await userEvent.click(buttonFirstPage)

    expect(button3).not.toHaveClass('hc-highlight-pagination')
    expect(button1).toHaveClass('hc-highlight-pagination')
    expect(button2).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).toBeDisabled()
    expect(buttonPageToPrev).toBeDisabled()
    expect(buttonPageToNext).not.toBeDisabled()
    expect(buttonLastPage).not.toBeDisabled()
  })

  it('SHOW CURRENT REPORT: show current page report with text "SHOWING 1 TO 5 OF 35 ENTRIES"', async () => {
    await setupCurrentPageReport()
    const currentReport = screen.getByLabelText(/current report/i)

    expect(currentReport).toBeInTheDocument()
    expect(screen.getByText(/showing 1 to 5 of 35 entries/i)).toBeInTheDocument()
  })

  it('SHOW CURRENT REPORT: show current page report with text "SHOWING 0 TO 0 OF 0 ENTRIES"', async () => {
    await render(PaginationComponent, {
      componentProperties: {
        rows: 5,
        totalRecords: 0,
        showCurrentPageReport: true,
        currentPageReportTemplate: 'showing {first} to {last} of {totalRecords} entries',
      },
    })
    const currentReport = screen.getByLabelText(/current report/i)

    expect(currentReport).toBeInTheDocument()
    expect(screen.getByText(/showing 0 to 0 of 0 entries/i)).toBeInTheDocument()
  })

  it('SERVER SIDE PAGINATION: create pagination with inital state', async () => {
    await setupPaginationServerSide()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    expect(buttonFirstPage).toBeDisabled()
    expect(buttonPageToPrev).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /^page /i }).length).toBe(2)
    expect(button1).toHaveClass('hc-highlight-pagination')
    expect(button2).not.toHaveClass('hc-highlight-pagination')
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(buttonPageToNext).not.toBeDisabled()
    expect(buttonLastPage).not.toBeDisabled()
  })

  it('SERVER SIDE PAGINATION: when click in page 2 must change to page two', async () => {
    await setupPaginationServerSide()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(button2)

    expect(button2).toHaveClass('hc-highlight-pagination')
    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).toBeDisabled()
    expect(buttonLastPage).toBeDisabled()
  })

  it('SERVER SIDE PAGINATION: when click in button next page change to page 2', async () => {
    await setupPaginationServerSide()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(buttonPageToNext)

    expect(button2).toHaveClass('hc-highlight-pagination')
    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).toBeDisabled()
    expect(buttonLastPage).toBeDisabled()
  })

  it('SERVER SIDE PAGINATION: when click in button to last page change to page 2', async () => {
    await setupPaginationServerSide()
    const button1 = screen.getByRole('button', { name: /page 1/i })
    const button2 = screen.getByRole('button', { name: /page 2/i })
    const buttonFirstPage = screen.getByRole('button', { name: /button first page/i })
    const buttonPageToPrev = screen.getByRole('button', { name: /button page to prev/i })
    const buttonPageToNext = screen.getByRole('button', { name: /button page to next/i })
    const buttonLastPage = screen.getByRole('button', { name: /button last page/i })

    await userEvent.click(buttonLastPage)

    expect(button1).not.toHaveClass('hc-highlight-pagination')
    expect(button2).toHaveClass('hc-highlight-pagination')
    expect(buttonFirstPage).not.toBeDisabled()
    expect(buttonPageToPrev).not.toBeDisabled()
    expect(buttonPageToNext).toBeDisabled()
    expect(buttonLastPage).toBeDisabled()
  })
})
