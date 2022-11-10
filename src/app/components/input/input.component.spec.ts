import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { render, screen } from '@testing-library/angular'

import { InputModule } from './input.module'
import userEvent from '@testing-library/user-event'

describe('InputComponent', () => {
  it('should create component input', async () => {
    const { container } = await render(
      `<form [formGroup]="form">
        <hc-input formControlName="login" ariaLabel="login"></hc-input>
      </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ login: [''] }),
        },
      }
    )

    expect(container).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /append-icon-button/i })
    ).not.toBeInTheDocument()
  })

  it('should get border primary color in focus', async () => {
    await render(
      `<form [formGroup]="form">
        <hc-input formControlName="login" ariaLabel="login"></hc-input>
       </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ login: [''] }),
        },
      }
    )

    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('textbox', { name: 'login' }))

    expect(screen.getByRole('textbox', { name: 'login' }).parentElement).toHaveClass(
      'input-focus'
    )
  })

  it('input have placeholder', async () => {
    await render(
      `<form [formGroup]="form">
        <hc-input formControlName="login" ariaLabel="login" [placeholder]="placeholder"></hc-input>
      </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ login: [''] }),
          placeholder: 'Login',
        },
      }
    )

    expect(screen.getByPlaceholderText('Login')).toBeInTheDocument()
  })

  it('input have append button', async () => {
    await render(
      `<form [formGroup]="form">
        <hc-input formControlName="password" ariaLabel="password" placeholder="password" appendIcon="visibility"></hc-input>
      </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ password: [''] }),
        },
      }
    )

    expect(
      screen.getByRole('button', { name: /append-icon-button/i })
    ).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /append-icon-button/i }))
  })

  it('input have a error', async () => {
    await render(
      `<form [formGroup]="form">
        <hc-input formControlName="login" ariaLabel="login" ></hc-input>
      </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ login: ['', [Validators.required]] }),
        },
      }
    )

    const input = screen.getByRole('textbox', { name: 'login' })
    await userEvent.click(input)

    expect(input.parentElement).toHaveClass('input-focus')
    await userEvent.tab()

    expect(screen.getByText('The login is required!'))
    expect(input.parentElement).toHaveClass('input-error')
  })

  it('input must be disabled', async () => {
    await render(
      `<form [formGroup]="form">
        <hc-input formControlName="login" ariaLabel="login"></hc-input>
      </form>`,
      {
        imports: [InputModule, ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ login: [{ value: '', disabled: true }] }),
        },
      }
    )

    expect(screen.getByRole('textbox', { name: 'login' })).toBeDisabled()
  })
})
