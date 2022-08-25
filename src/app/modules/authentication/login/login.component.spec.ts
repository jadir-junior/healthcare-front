import { render, screen } from '@testing-library/angular'

import { InputModule } from 'src/app/components/input/input.module'
import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'
import userEvent from '@testing-library/user-event'

describe('LoginComponent', () => {
  const setup = async () => {
    return render(LoginComponent, {
      imports: [ReactiveFormsModule, InputModule],
    })
  }

  it('should create a login page', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/sign in to access your account/i)).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('should show messages required', async () => {
    await setup()

    await userEvent.click(screen.getByRole('textbox', { name: 'login' }))
    await userEvent.click(screen.getByLabelText(/password/i))
    await userEvent.tab()

    expect(screen.getByText(/the login is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required!/i)).toBeInTheDocument()
  })
})
