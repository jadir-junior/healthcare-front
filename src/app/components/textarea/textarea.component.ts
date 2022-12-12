import { AfterContentInit, Component, Injector, Input } from '@angular/core'
import { ControlValueAccessor, NgControl } from '@angular/forms'

@Component({
  selector: 'hc-textarea',
  templateUrl: 'textarea.component.html',
  styles: [],
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
  onTouched!: () => void

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

  registerOnTouched(fn: () => void): void {
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
      ['hc-text-label']: true,
      ['hc-text-label-focus']: this.isFocus,
      ['hc-text-label-error']:
        this.formControl.invalid &&
        (this.submitted || this.formControl.dirty || this.formControl.touched),
    }
  }
}
