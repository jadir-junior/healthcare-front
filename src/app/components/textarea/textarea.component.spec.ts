import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { render, screen } from '@testing-library/angular'

import { TextareaComponent } from './textarea.component'
import userEvent from '@testing-library/user-event'

describe('TextareaComponent', () => {
  it('should create a textarea component', async () => {
    const { container } = await render(
      `<form [formGroup]="form">
      <hc-textarea formControlName="text"></hc-textarea>
    </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ text: '' }),
        },
      }
    )
    expect(container).toBeInTheDocument()
  })

  it('should change a color of label when focus', async () => {
    await render(
      `<form [formGroup]="form">
      <hc-textarea ariaLabel="textarea" formControlName="text" label="text"></hc-textarea>
    </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ text: '' }),
        },
      }
    )

    await userEvent.click(screen.getByLabelText(/textarea/i))

    expect(screen.getByText('text')).toHaveClass('hc-textarea-label-focus')
  })

  it('should change a color of label to red when textarea is invalid', async () => {
    await render(
      `<form [formGroup]="form">
      <hc-textarea ariaLabel="textarea" formControlName="text" label="text"></hc-textarea>
    </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({ text: ['', [Validators.required]] }),
        },
      }
    )

    await userEvent.click(screen.getByLabelText(/textarea/i))
    await userEvent.click(screen.getByText('text'))

    expect(screen.getByText('text')).toHaveClass('hc-textarea-label-error')
  })
})
