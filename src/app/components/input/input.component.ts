/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, ElementRef, Input } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

@Component({
  selector: 'hc-input',
  template: `
    <input
      #input
      [type]="type"
      [disabled]="disabled"
      [attr.placeholder]="placeholder"
      [attr.aria-label]="ariaLabel"
      [ngClass]="{
        'input-focus': isFocus,
        'input-error': ngControl.invalid && (ngControl.dirty || ngControl.touched)
      }"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keyup)="onChange(input.value)"
    />
  `,
  styleUrls: ['input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'tel ' = 'text'
  @Input() placeholder = ''
  @Input() ariaLabel?: string
  @Input() formControlName!: string

  disabled = false
  isFocus = false
  value!: string

  onChange!: (value: string) => void
  onTouched = () => {}

  constructor(public ngControl: NgControl, private elem: ElementRef) {
    this.registerNgControl()
  }

  registerNgControl(): void {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this
    } else {
      throw new Error(
        `You need pass the ["formControlName"] in the ${this.elem.nativeElement.tagName.toLowerCase()}`
      )
    }
  }

  onFocus(): void {
    this.isFocus = true
  }

  onBlur(): void {
    this.isFocus = false
    this.onTouched()
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
