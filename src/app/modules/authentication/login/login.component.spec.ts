import { AuthenticationService } from './../authentication.service'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
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
  const loginSpy = jest.fn()

  const setup = async () => {
    return render(LoginComponent, {
      imports: [
        ReactiveFormsModule,
        InputModule,
        SwitchModule,
        ButtonModule,
        IconModule,
        LinkModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            login: loginSpy,
          },
        },
      ],
    })
  }

  it('should create a login page', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByText(/sign in to access your account/i)).toBeInTheDocument()

    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i, { selector: 'input' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'remember me' })).toBeChecked()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /forgot password/i })).toBeInTheDocument()
    expect(screen.getByText(`Don't have an account?`)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  it('should show messages required', async () => {
    await setup()

    await userEvent.click(screen.getByRole('textbox', { name: 'login' }))
    await userEvent.click(screen.getByLabelText(/password/i, { selector: 'input' }))
    await userEvent.tab()

    expect(screen.getByText(/the login is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required!/i)).toBeInTheDocument()
  })

  it('should show a password when click in append button', async () => {
    await setup()

    expect(
      screen.getByLabelText(/password/i, { selector: 'input', exact: true })
    ).toHaveAttribute('type', 'password')

    await userEvent.click(screen.getByRole('button', { name: 'append-icon-button' }))

    expect(
      screen.getByLabelText(/password/i, { selector: 'input', exact: true })
    ).toHaveAttribute('type', 'text')
  })

  it('login in the sign in', async () => {
    await setup()

    await userEvent.type(
      screen.getByRole('textbox', { name: 'login' }),
      'john.doe@gmail.com'
    )
    await userEvent.type(
      screen.getByLabelText(/password/i, { selector: 'input' }),
      'Password123*'
    )
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginSpy).toHaveBeenCalledWith({
      login: 'john.doe@gmail.com',
      password: 'Password123*',
      rememberMe: true,
    })
  })
})
