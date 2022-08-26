import { render, screen } from '@testing-library/angular'

import { ButtonModule } from 'src/app/components/button/button.module'
import { PageNotFoundComponent } from './page-not-found.component'

describe('PageNotFoundComponent', () => {
  const setup = async () => {
    return render(PageNotFoundComponent, {
      imports: [ButtonModule],
    })
  }

  it('should create a page not found', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(
      screen.getByText(`Oops. The page you were looking for doesn't exist.`)
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument()
  })
})
