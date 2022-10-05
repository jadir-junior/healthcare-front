import { render, screen } from '@testing-library/angular'

import { ComponentsModule } from 'src/app/components/components.module'
import { ReactiveFormsModule } from '@angular/forms'
import { RegisterComponent } from './register.component'
import userEvent from '@testing-library/user-event'

describe('RegisterComponent', () => {
  const setup = async () => {
    return render(RegisterComponent, {
      imports: [ReactiveFormsModule, ComponentsModule],
    })
  }

  it('should create a page register', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.getByText('Sign up', { selector: 'h1' })).toBeInTheDocument()
    expect(screen.getByText(/create your account/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'email' })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: 'terms' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'sign up' })).toBeInTheDocument()
    expect(screen.getByText(/have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('should show messages to "name", "email" and "password" required', async () => {
    await setup()

    await userEvent.click(screen.getByRole('textbox', { name: 'name' }))
    await userEvent.click(screen.getByRole('textbox', { name: 'email' }))
    await userEvent.click(screen.getByLabelText(/password/i))
    await userEvent.tab()

    expect(screen.getByText(/the name is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the email is required!/i)).toBeInTheDocument()
  })

  it('should try submit form without fill fields and show messages required', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(screen.getByText(/the name is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required!/i)).toBeInTheDocument()
    expect(screen.getByText(/the email is required!/i)).toBeInTheDocument()
  })

  it('should show a password when click in append button', async () => {
    await setup()

    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password')

    await userEvent.click(screen.getByRole('button', { name: 'append-icon-button' }))

    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'text')
  })

  it('should show a message error "invalid email address"', async () => {
    await setup()

    await userEvent.type(screen.getByRole('textbox', { name: 'email' }), 'junior')
    await userEvent.tab()

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
  })

  it('should show a message error to password is not strength', async () => {
    await setup()

    await userEvent.type(screen.getByLabelText(/password/i), 'junior')
    await userEvent.tab()

    expect(
      screen.getByText(
        /your password must be 8-20 characters long, contain letters uppercase and lowercase, special characters/i
      )
    ).toBeInTheDocument()
  })
})
