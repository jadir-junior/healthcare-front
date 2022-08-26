import { render, screen } from '@testing-library/angular'

import { ButtonModule } from 'src/app/components/button/button.module'
import { IconModule } from 'src/app/components/icon/icon.module'
import { InputModule } from 'src/app/components/input/input.module'
import { LinkModule } from 'src/app/components/link/link.module'
import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SwitchModule } from 'src/app/components/switch/switch.module'
import userEvent from '@testing-library/user-event'

describe('LoginComponent', () => {
  const setup = async () => {
    return render(LoginComponent, {
      imports: [
        ReactiveFormsModule,
        InputModule,
        SwitchModule,
        ButtonModule,
        IconModule,
        LinkModule,
      ],
    })
  }

  it('should create a login page', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/sign in to access your account/i)).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'remember me' })).toBeChecked()
  })

  it('should show messages required', async () => {
    await setup()

    await userEvent.click(screen.getByRole('textbox', { name: 'login' }))
    await userEvent.click(screen.getByLabelText(/password/i))
    await userEvent.tab()

    expect(screen.getByText(/the login is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required!/i)).toBeInTheDocument()
  })

  it('should show a password when click in append button', async () => {
    await setup()

    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password')

    await userEvent.click(screen.getByRole('button', { name: 'append-icon-button' }))

    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'text')
  })
})
