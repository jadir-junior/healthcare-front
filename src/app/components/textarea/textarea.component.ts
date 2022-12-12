/* eslint-disable @typescript-eslint/no-empty-function */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  Provider,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

import { NG_VALUE_ACCESSOR } from '@angular/forms'

const TEXTAREA_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => TextareaComponent),
}

@Component({
  selector: 'hc-textarea',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TEXTAREA_VALUE_ACCESSOR],
})
export class TextareaComponent implements ControlValueAccessor, AfterContentInit {
  @Input() placeholder = ''
  @Input() ariaLabel?: string
  @Input() submitted = false
  @Input() id?: string
  @Input() label?: string
  @Input() rows = 10
  @Input() cols = 30

  disabled = false
  isFocus = false
  value!: string
  formControl!: NgControl

  onChange!: (value: string) => void
  onTouched = () => {}

  constructor(private injector: Injector) {}

  ngAfterContentInit(): void {
    this.formControl = this.injector.get(NgControl)
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: VoidFunction): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  onInputChange(value: string): void {
    if (this.disabled) {
      return
    }

    this.value = value

    this.onChange(this.value)
  }

  onFocus(): void {
    this.isFocus = true
  }

  onBlur(): void {
    this.isFocus = false
    this.onTouched()
  }

  get labelClasses() {
    return {
      ['hc-textarea-label']: true,
      ['hc-textarea-label-focus']: this.isFocus,
      ['hc-textarea-label-error']:
        this.formControl.invalid && (this.formControl.dirty || this.formControl.touched),
    }
  }

  get textareaClasses() {
    return {
      'hc-textarea': true,
      'hc-textarea-focus': this.isFocus,
      'hc-textarea-error':
        this.formControl.invalid && (this.formControl.dirty || this.formControl.touched),
    }
  }
}
