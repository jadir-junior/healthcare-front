import { Component, Input, Provider, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

const HC_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => InputComponent),
}

@Component({
  selector: 'hc-input',
  template: `
    <input
      #input
      [type]="type"
      [attr.placeholder]="placeholder"
      [attr.aria-label]="ariaLabel"
      [ngClass]="{
        'input-focus': isFocus
      }"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keyup)="onChange(input.value)"
    />
  `,
  styles: [
    `
      input {
        width: 100%;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        padding: 14px 16px;
        border-radius: 8px;
        border: 1px solid var(--neutral-gray);
        color: var(--neutral-black);
        outline: 0;

        ::placeholder {
          color: var(--neutral-gray);
        }
      }

      .input-focus {
        border: 1.5px solid var(--primary-color);
      }
    `,
  ],
  providers: [HC_INPUT_VALUE_ACCESSOR],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' = 'text'
  @Input() placeholder = ''
  @Input() ariaLabel?: string

  isFocus = false
  value!: string

  onChange!: (value: string) => void
  onTouched!: () => void

  onFocus(): void {
    this.isFocus = true
  }

  onBlur(): void {
    this.isFocus = false
  }

  writeValue(value: string): void {
    this.value = value
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
}
