/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  Provider,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms'
import { includes, isEqual } from 'lodash'

export const CHECKBOX_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
}

@Component({
  selector: 'hc-checkbox',
  template: `
    <div class="hc-checkbox">
      <div class="hc-hidden-accessible">
        <input
          type="checkbox"
          #cb
          [attr.id]="id"
          [attr.name]="name"
          [attr.aria-checked]="checked()"
          [value]="value"
          [checked]="checked()"
          [disabled]="disabled"
          (focus)="onFocus()"
          (blur)="onBlur()"
        />
      </div>
      <div
        class="hc-checkbox-box"
        [ngClass]="classesCheckbox"
        [attr.data-testid]="'checkbox-' + id"
        (click)="onClick($event, cb, true)"
      >
        <span class="material-symbols-outlined" *ngIf="checked()">check</span>
      </div>
      <label
        *ngIf="label"
        [attr.for]="id"
        [attr.data-testid]="'label-' + id"
        [ngClass]="classesLabel"
        (click)="onClick($event, cb, true)"
      >
        {{ label }}
      </label>
    </div>
  `,
  styleUrls: ['checkbox.component.scss'],
  providers: [CHECKBOX_VALUE_ACCESSOR],
})
export class CheckboxComponent implements ControlValueAccessor {
  model!: string[] | boolean
  focused = false

  @Input() binary = false
  @Input() disabled = false
  @Input() id?: string
  @Input() falseValue = false
  @Input() formControl?: FormControl
  @Input() label?: string
  @Input() name?: string
  @Input() readonly = false
  @Input() trueValue = true
  @Input() value!: string

  @Output() onChange = new EventEmitter()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onModelChange = (model: string[] | boolean) => {}
  onModelTouched = () => {}

  constructor(public cd: ChangeDetectorRef) {}

  writeValue(model: string[]): void {
    this.model = model
    this.cd.markForCheck()
  }

  registerOnChange(fn: () => void): void {
    this.onModelChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.cd.markForCheck()
  }

  onClick(event: Event, checkbox: HTMLInputElement, focus: boolean): void {
    event.preventDefault()

    if (this.disabled || this.readonly) {
      return
    }

    this.updateModel(event)

    if (focus) {
      checkbox.focus()
    }
  }

  updateModel(event: Event) {
    let newModelValue: string[] | boolean

    if (!this.binary && Array.isArray(this.model)) {
      if (this.checked()) {
        newModelValue = this.model.filter((val: string) => !isEqual(val, this.value))
      } else {
        newModelValue = this.model.length ? [...this.model, this.value] : [this.value]
      }

      this.onModelChange(newModelValue)
      this.model = newModelValue

      if (this.formControl) {
        this.formControl.setValue(newModelValue)
      }
    } else {
      newModelValue = this.checked() ? this.falseValue : this.trueValue
      this.model = newModelValue
      this.onModelChange(newModelValue)
    }

    this.onChange.emit({ checked: newModelValue, originalEvent: event })
  }

  checked() {
    return this.binary
      ? this.model === this.trueValue
      : includes(this.model as string[], this.value)
  }

  onFocus() {
    this.focused = true
  }

  onBlur() {
    this.focused = false
    this.onModelTouched()
  }

  get classesCheckbox() {
    return {
      ['hc-checkbox-highlight']: this.checked(),
      ['hc-checkbox-focus']: this.focused,
      ['hc-checkbox-disabled']: this.disabled,
    }
  }

  get classesLabel() {
    return {
      ['hc-checkbox-label']: true,
      ['hc-checkbox-label-disabled']: this.disabled,
    }
  }
}
