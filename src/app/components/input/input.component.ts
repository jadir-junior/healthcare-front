import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { InputmaskOptions } from '@ngneat/input-mask'

@Component({
  selector: 'hc-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.scss'],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'tel' | 'password' | 'email' | 'number' = 'text'
  @Input() placeholder = ''
  @Input() ariaLabel?: string
  @Input() formControlName!: string
  @Input() submitted = false
  @Input() id?: string
  @Input() label?: string
  @Input() appendIcon?: string
  @Input() inputMask!: InputmaskOptions<unknown>

  @Output() appendIconClickEvent = new EventEmitter()

  disabled = false
  isFocus = false
  value!: string

  onChange!: (value: string) => void
  onTouched!: () => void

  constructor(
    public ngControl: NgControl,
    private elem: ElementRef
  ) {
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

  onAppendIconClick() {
    this.appendIconClickEvent.emit()
  }

  onInputChange(value: string): void {
    this.onChange(value)
  }

  onFocus(): void {
    this.isFocus = true
  }

  onBlur(): void {
    this.isFocus = false
    this.onTouched()
  }

  removeCharacterSpecialFromMask(value: string): string {
    if (this.inputMask) {
      return value.replace(/[^a-zA-Z0-9]/g, '')
    }

    return value
  }

  get labelClasses() {
    return {
      ['hc-input-label']: true,
      ['hc-input-label-focus']: this.isFocus,
      ['hc-input-label-error']:
        this.ngControl.invalid &&
        (this.submitted || this.ngControl.dirty || this.ngControl.touched),
    }
  }
}
