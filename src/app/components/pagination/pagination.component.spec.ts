import { render, screen } from '@testing-library/angular'

import { IMeta } from 'src/app/models/pagination.model'
import { PaginationComponent } from './pagination.component'
import userEvent from '@testing-library/user-event'

const PAGINATION_PAGE_1: IMeta = {
  totalItems: 10,
  itemCount: 5,
  itemsPerPage: 5,
  totalPages: 2,
  currentPage: 1,
}

describe('PaginationComponent', () => {
  const setup = async () => {
    return render(PaginationComponent, {
      componentProperties: {
        pagination: PAGINATION_PAGE_1,
        rows: PAGINATION_PAGE_1.itemsPerPage,
        totalRecords: PAGINATION_PAGE_1.totalItems,
      },
    })
  }

  it('should create', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
  })

  it('create pagination with inital state', async () => {
    await setup()

    expect(screen.getByRole('button', { name: /button first page/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /button page to prev/i })).toBeDisabled()
    expect(screen.getAllByRole('button', { name: /^page /i }).length).toBe(2)
    expect(screen.getByRole('button', { name: /page 1/i })).toHaveClass(
      'hc-highlight-pagination'
    )
    expect(screen.getByRole('button', { name: /page 2/i })).not.toHaveClass(
      'hc-highlight-pagination'
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /button page to next/i })
    ).not.toBeDisabled()
    expect(screen.getByRole('button', { name: /button last page/i })).not.toBeDisabled()
  })

  it('when click in page 2 must change to page two', async () => {
    const { debug } = await setup()
    const button2 = screen.getByRole('button', { name: /page 2/i })

    await userEvent.click(button2)

    debug(screen.getByLabelText('pagination'))
    expect(button2).toHaveClass('hc-highlight-pagination')
  })
})
