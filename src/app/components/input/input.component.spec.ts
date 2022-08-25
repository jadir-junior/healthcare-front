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

    expect(screen.getByRole('textbox', { name: 'login' })).toHaveClass('input-focus')
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

  it.skip('input have a error', async () => {
    const { debug } = await render(InputComponent, {
      componentProperties: {
        ariaLabel: 'login',
      },
      providers: [
        { provide: NgControl, useValue: new FormControl('', [Validators.required]) },
      ],
    })

    const input = screen.getByRole('textbox', { name: 'login' })
    await userEvent.click(input)

    expect(input).toHaveClass('input-focus')
    await userEvent.tab()

    debug(input)
    expect(input).toHaveClass('input-error')
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
