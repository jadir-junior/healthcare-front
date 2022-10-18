/* eslint-disable @typescript-eslint/no-empty-function */

import {
  Component,
  EventEmitter,
  Input,
  Output,
  Provider,
  forwardRef,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

import { ChangeDetectorRef } from '@angular/core'

const SWITCH_VALUE_ACcESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => SwitchComponent),
}

export interface ISwitchOnChangeEvent {
  originalEvent: Event
  checked: boolean
}

@Component({
  selector: 'hc-switch',
  template: `
    <label [attr.for]="id" [ngClass]="labelClasses">
      <div [ngClass]="classes" (click)="onClick($event, cb)" role="switch">
        <div class="hc-switch-hidden-accessible">
          <input
            #cb
            type="checkbox"
            [attr.aria-label]="ariaLabel"
            [attr.id]="id"
            [attr.name]="name"
            [attr.tabindex]="tabindex"
            [attr.aria-checked]="checked()"
            [attr.aria-labelledby]="ariaLabelledBy"
            [checked]="checked()"
            [disabled]="disabled"
            (focus)="onFocus()"
            (blur)="onBlur()"
          />
        </div>
        <span class="hc-switch-slider"></span>
      </div>
      <span *ngIf="label" class="hc-switch-label-text">{{ label }}</span>
    </label>
  `,
  styleUrls: ['switch.component.scss'],
  providers: [SWITCH_VALUE_ACcESSOR],
})
export class SwitchComponent implements ControlValueAccessor {
  modelValue = false
  trueValue = true
  falseValue = false
  focused = false

  @Input() ariaLabel?: string
  @Input() ariaLabelledBy?: string
  @Input() name?: string
  @Input() id?: string
  @Input() label?: string
  @Input() readonly = false
  @Input() tabindex: number | null = null
  @Input() disabled = false

  @Output() onChange = new EventEmitter<ISwitchOnChangeEvent>()

  constructor(public cd: ChangeDetectorRef) {}

  onModelChange: (value: boolean) => void = () => {}
  onModelTouched: () => void = () => {}

  writeValue(value: boolean): void {
    this.modelValue = value
    this.cd.markForCheck()
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onModelChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onModelTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
    this.cd.markForCheck()
  }

  toggle(event: Event): void {
    this.updateModel(event, !this.checked())
  }

  onClick(event: Event, cb: HTMLInputElement): void {
    if (!this.disabled && !this.readonly) {
      event.preventDefault()
      this.toggle(event)
      cb.focus()
    }
  }

  updateModel(event: Event, value: boolean): void {
    this.modelValue = value ? this.trueValue : this.falseValue
    this.onModelChange(this.modelValue)
    this.onChange.emit({
      originalEvent: event,
      checked: this.modelValue,
    })
  }

  onFocus(): void {
    this.focused = true
  }

  onBlur(): void {
    this.focused = false
    this.onModelTouched()
  }

  checked(): boolean {
    return this.modelValue === this.trueValue
  }

  get classes() {
    return {
      ['hc-switch']: true,
      ['hc-switch-checked']: this.checked(),
      ['hc-switch-disabled']: this.disabled,
      ['hc-switch-focus']: this.focused,
    }
  }

  get labelClasses() {
    return {
      ['hc-switch-label']: true,
      ['hc-switch-label-disabled']: this.disabled,
    }
  }
}
