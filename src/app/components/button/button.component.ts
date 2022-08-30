import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'hc-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="classes"
      [attr.aria-label]="ariaLabel"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (click)="onClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  isHover = false
  isPressed = false

  @Input() type: 'submit' | 'button' = 'button'
  @Input() color: 'primary' | 'secondary' | 'default' = 'default'
  @Input() theme: 'contained' | 'outlined' | 'text' = 'contained'
  @Input() ariaLabel?: string
  @Input() disabled = false

  @Output() clickEvent = new EventEmitter<Event>()

  onClick(): void {
    this.isPressed = true
    this.clickEvent.emit()
  }

  onMouseEnter(): void {
    this.isHover = true
  }

  onMouseLeave(): void {
    this.isHover = false
  }

  public get classes() {
    return {
      [`btn-${this.theme}-${this.color}`]: true,
      [`btn-${this.theme}-disabled`]: this.disabled,
      [`btn-${this.theme}-${this.color}-hover`]: this.isHover,
      [`btn-${this.theme}-${this.color}-pressed`]: this.isPressed,
    }
  }
}
