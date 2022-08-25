import { FormControl, NgControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { render, screen } from '@testing-library/angular'

import { InputComponent } from './input.component'
import userEvent from '@testing-library/user-event'

describe('InputComponent', () => {
  it('should create component input', async () => {
    const { container } = await render(InputComponent, {
      providers: [{ provide: NgControl, useValue: new FormControl() }],
    })

    expect(container).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /append-icon-button/i })
    ).not.toBeInTheDocument()
  })

  it('should get border primary color in focus', async () => {
    await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'login',
      },
      providers: [{ provide: NgControl, useValue: new FormControl() }],
    })

    expect(screen.getByRole('textbox', { name: 'login' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('textbox', { name: 'login' }))

    expect(screen.getByRole('textbox', { name: 'login' }).parentElement).toHaveClass(
      'input-focus'
    )
  })

  it('input have placeholder', async () => {
    await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'login',
        placeholder: 'Login',
      },
      providers: [{ provide: NgControl, useValue: new FormControl() }],
    })

    expect(screen.getByPlaceholderText('Login')).toBeInTheDocument()
  })

  it('input have append button', async () => {
    await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'password',
        placeholder: 'Password',
        appendIcon: 'visibility',
      },
      providers: [{ provide: NgControl, useValue: new FormControl() }],
    })

    expect(
      screen.getByRole('button', { name: /append-icon-button/i })
    ).toBeInTheDocument()
  })

  it.skip('input have a error', async () => {
    await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'login',
      },
      providers: [
        { provide: NgControl, useValue: new FormControl('', [Validators.required]) },
      ],
    })

    const input = screen.getByRole('textbox', { name: 'login' })
    await userEvent.click(input)

    expect(input.parentElement).toHaveClass('input-focus')
    await userEvent.tab()

    expect(input.parentElement).toHaveClass('input-error')
  })

  it.skip('input must be disabled', async () => {
    const { fixture } = await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'login',
      },
      providers: [
        {
          provide: NgControl,
          useValue: new FormControl({ disabled: true }),
        },
      ],
      imports: [ReactiveFormsModule],
    })

    fixture.detectChanges()

    expect(screen.getByRole('textbox', { name: 'login' })).toBeDisabled()
  })
})
