import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { render, screen } from '@testing-library/angular'

import { CheckboxComponent } from './checkbox.component'
import userEvent from '@testing-library/user-event'

describe('CheckboxComponent', () => {
  it('create a checkbox component', async () => {
    const { container } = await render(CheckboxComponent, {
      componentProperties: {
        label: 'New York',
        value: 'New York',
        id: 'ny',
      },
    })

    expect(container).toBeInTheDocument()
  })

  it('check the checkbox', async () => {
    await render(
      '<hc-checkbox label="New York" name="group1" value="New York" [(ngModel)]="selectedCities" id="ny" ></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          selectedCities: [],
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))

    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-highlight')
  })

  it('check the checkbox and uncheck', async () => {
    await render(
      '<hc-checkbox label="New York" name="group1" value="New York" [(ngModel)]="selectedCities" id="ny" ></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          selectedCities: [],
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))

    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-highlight')

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))

    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-ny/i)).not.toHaveClass('hc-checkbox-highlight')
  })

  it(`when checkbox is disabled if the user click don't happen nothing`, async () => {
    await render(
      '<hc-checkbox label="New York" name="group1" value="New York" [(ngModel)]="selectedCities" id="ny" [disabled]="true"></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          selectedCities: [],
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))

    expect(screen.getByTestId(/checkbox-ny/i)).not.toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-ny/i)).not.toHaveClass('hc-checkbox-highlight')
    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-disabled')
    expect(screen.getByTestId(/label-ny/i)).toHaveClass('hc-checkbox-label-disabled')
  })

  it(`checkbox with form control`, async () => {
    await render(
      '<hc-checkbox label="New York" name="group1" value="New York" [formControl]="cities" id="ny"></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [ReactiveFormsModule],
        componentProperties: {
          cities: new FormControl([]),
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))

    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-highlight')
  })

  it(`checkbox with binary`, async () => {
    await render(
      '<hc-checkbox label="Terms" [binary]="true" [(ngModel)]="terms" id="terms"></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          terms: false,
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-terms/i))

    expect(screen.getByTestId(/checkbox-terms/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-terms/i)).toHaveClass('hc-checkbox-highlight')
  })

  it(`check the checkbox with binary and uncheck`, async () => {
    await render(
      '<hc-checkbox label="Terms" [binary]="true" [(ngModel)]="terms" id="terms"></hc-checkbox>',
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          terms: false,
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-terms/i))

    expect(screen.getByTestId(/checkbox-terms/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-terms/i)).toHaveClass('hc-checkbox-highlight')

    await userEvent.click(screen.getByTestId(/checkbox-terms/i))

    expect(screen.getByTestId(/checkbox-terms/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-terms/i)).not.toHaveClass('hc-checkbox-highlight')
  })

  it(`check two checkboxs with group`, async () => {
    await render(
      `<hc-checkbox label="New York" name="group1" value="New York" [(ngModel)]="selectedCities" id="ny" ></hc-checkbox>
      <hc-checkbox label="San Francisco" name="group1" value="San Francisco" [(ngModel)]="selectedCities" id="sf" ></hc-checkbox>
      `,
      {
        declarations: [CheckboxComponent],
        imports: [FormsModule],
        componentProperties: {
          selectedCities: [],
        },
      }
    )

    await userEvent.click(screen.getByTestId(/checkbox-ny/i))
    await userEvent.click(screen.getByTestId(/checkbox-sf/i))

    expect(screen.getByTestId(/checkbox-ny/i)).toHaveClass('hc-checkbox-highlight')
    expect(screen.getByTestId(/checkbox-sf/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-sf/i)).toHaveClass('hc-checkbox-highlight')

    await userEvent.click(screen.getByTestId(/checkbox-sf/i))
    expect(screen.getByTestId(/checkbox-sf/i)).toHaveClass('hc-checkbox-focus')
    expect(screen.getByTestId(/checkbox-sf/i)).not.toHaveClass('hc-checkbox-highlight')
  })
})
