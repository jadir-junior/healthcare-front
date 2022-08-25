import { render, screen } from '@testing-library/angular'

import { InputModule } from 'src/app/components/input/input.module'
import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'

describe('LoginComponent', () => {
  const setup = async () => {
    return render(LoginComponent, {
      imports: [ReactiveFormsModule, InputModule],
    })
  }

  it('should create a login page', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/sign in to access your account/i)).toBeInTheDocument()
  })
})
