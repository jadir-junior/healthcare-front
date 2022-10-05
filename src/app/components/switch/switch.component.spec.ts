import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { render, screen } from '@testing-library/angular'

import { SwitchComponent } from './switch.component'
import { SwitchModule } from './switch.module'
import userEvent from '@testing-library/user-event'

describe('SwitchComponent', () => {
  it('should create a switch', async () => {
    const { container } = await render(SwitchComponent)

    expect(container).toBeInTheDocument()
  })

  it('should create a switch with label', async () => {
    await render(SwitchComponent, {
      componentProperties: {
        label: 'Remember me',
      },
    })

    expect(screen.getByText(/remember me/i)).toBeInTheDocument()
  })

  it('create switch disabled', async () => {
    await render(SwitchComponent, {
      componentProperties: {
        disabled: true,
      },
    })

    expect(screen.getByRole('switch')).toHaveClass('hc-switch-disabled')
  })

  it('switch disabled with form control', async () => {
    await render(
      `<form [formGroup]="form">
      <hc-switch formControlName="term"></hc-switch>
    </form>`,
      {
        imports: [ReactiveFormsModule, SwitchModule],
        componentProperties: {
          form: new FormBuilder().group({
            term: [{ value: '', disabled: true }],
          }),
        },
      }
    )

    expect(screen.getByRole('switch')).toHaveClass('hc-switch-disabled')
  })

  it('toggle switch', async () => {
    await render(SwitchComponent)
    const switchComp = screen.getByRole('switch')

    expect(switchComp).not.toHaveClass('hc-switch-checked')

    await userEvent.click(switchComp)

    expect(switchComp).toHaveClass('hc-switch-checked')

    await userEvent.click(switchComp)

    expect(switchComp).not.toHaveClass('hc-switch-checked')
  })

  it('click in switch with focus and blur', async () => {
    await render(`<div data-testid="outside"><hc-switch></hc-switch></div>`, {
      declarations: [SwitchComponent],
    })

    expect(screen.getByRole('switch')).not.toHaveClass('hc-switch-focus')

    await userEvent.click(screen.getByRole('switch'))

    expect(screen.getByRole('switch')).toHaveClass('hc-switch-focus')

    await userEvent.click(screen.getByTestId('outside'))

    expect(screen.getByRole('switch')).not.toHaveClass('hc-switch-focus')
  })
})
