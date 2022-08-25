/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, Provider, forwardRef } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

const SWITCH_VALUE_ACcESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => SwitchComponent),
}

@Component({
  selector: 'hc-switch',
  template: `
    <div class="wrapper-switch">
      <input
        #input
        type="checkbox"
        name="switch"
        id="switch"
        [disabled]="disabled"
        [checked]="value"
        [attr.aria-label]="ariaLabel"
        (change)="onChange(input.checked)"
      />
      <label for="switch" [ngClass]="{ 'disabled': disabled }"></label>
      <div *ngIf="label" class="label" [ngClass]="{ 'disabled': disabled }">
        {{ label }}
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper-switch {
        display: flex;
        align-items: center;
      }

      input[type='checkbox'] {
        width: 0;
        height: 0;
        visibility: hidden;
      }

      label {
        display: block;
        width: 36px;
        height: 20px;
        background-color: var(--neutral-gray);
        border-radius: 100px;
        position: relative;
        cursor: pointer;
        transition: 0.5s;
      }

      label::after {
        content: '';
        width: 16px;
        height: 16px;
        background-color: white;
        position: absolute;
        border-radius: 70px;
        top: 2px;
        left: 2px;
        transition: 0.5s;
      }

      input:checked + label:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      input:checked + label {
        background-color: var(--primary-color);
      }

      .disabled::after {
        background-color: var(--neutral-gray-light);
      }

      label.disabled {
        background-color: var(--neutral-divider);
      }

      input:checked + label.disabled {
        background-color: var(--neutral-divider);
      }

      .label {
        margin-left: 8px;
        font-size: 16px;
        margin-bottom: 4px;
        font-weight: bold;
        color: var(--neutral-black);
      }

      .label.disabled {
        color: var(--neutral-gray-light);
      }
    `,
  ],
  providers: [SWITCH_VALUE_ACcESSOR],
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() label?: string
  @Input() ariaLabel?: string

  disabled = false
  value!: boolean

  onChange!: (value: boolean) => void
  onTouched!: () => void

  writeValue(value: boolean): void {
    this.value = value
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
