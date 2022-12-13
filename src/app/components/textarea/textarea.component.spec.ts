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

  it('should change the color of label when focus', async () => {
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

  it('should change the color of label to red when textarea is invalid', async () => {
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

  it('should change the border color of textarea when textarea is focus', async () => {
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

    expect(screen.getByLabelText(/textarea/i)).toHaveClass('hc-textarea-focus')
  })

  it('should change the border color of textarea to red when it is invalid', async () => {
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

    expect(screen.getByLabelText(/textarea/i)).toHaveClass('hc-textarea-error')
  })

  it('should be disabled when disable', async () => {
    await render(
      `<form [formGroup]="form">
      <hc-textarea ariaLabel="textarea" formControlName="text" label="text"></hc-textarea>
    </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({
            text: [{ value: '', disabled: true }, [Validators.required]],
          }),
        },
      }
    )

    expect(screen.getByLabelText(/textarea/i)).toBeDisabled()
  })

  it('should digit a value and return value to form', async () => {
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

    await userEvent.type(screen.getByLabelText(/textarea/i), 'this is a test')

    expect(screen.getByLabelText(/textarea/i)).toHaveValue('this is a test')
  })

  it('should digit a value and it does not fill when disabled', async () => {
    await render(
      `<form [formGroup]="form">
      <hc-textarea ariaLabel="textarea" formControlName="text" label="text"></hc-textarea>
    </form>`,
      {
        declarations: [TextareaComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          form: new FormBuilder().group({
            text: [{ value: '', disabled: true }, [Validators.required]],
          }),
        },
      }
    )

    await userEvent.type(screen.getByLabelText(/textarea/i), 'this is a test')

    expect(screen.getByLabelText(/textarea/i)).not.toHaveValue('this is a test')
  })
})
