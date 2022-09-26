/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { render, screen } from '@testing-library/angular'

import { ReactiveFormsModule } from '@angular/forms'
import { SearchComponent } from './search.component'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/angular'

describe('SearchComponent', () => {
  const setup = async () => {
    return render(SearchComponent, {
      imports: [ReactiveFormsModule],
    })
  }

  it('create a search component', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })

  it('when click in search must focus', async () => {
    await setup()

    await userEvent.click(screen.getByRole('search'))

    expect(screen.getByTestId(/search/i)).toHaveClass('hc-search-focus')
  })

  it('when click in search must focus and outside remove focus', async () => {
    await render(
      `<div data-testid="outside">
    <hc-search></hc-search>
    </div>`,
      {
        declarations: [SearchComponent],
        imports: [ReactiveFormsModule],
      }
    )

    await userEvent.click(screen.getByRole('search'))

    expect(screen.getByTestId(/search/i)).toHaveClass('hc-search-focus')

    await userEvent.click(screen.getByTestId('outside'))

    expect(screen.getByTestId(/search/i)).not.toHaveClass('hc-search-focus')
  })

  it('when search a term must emit the term', async () => {
    const { fixture } = await setup()
    const component = fixture.componentInstance
    const onSeachSpy = jest.spyOn(component.onSearch, 'emit')

    await userEvent.type(screen.getByRole('search'), 'term')

    await waitFor(() => {
      expect(onSeachSpy).toHaveBeenCalledWith('term')
    })
  })
})
