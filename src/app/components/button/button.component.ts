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
      (click)="click()"
    >
      <ng-content></ng-content>
      <span class="material-symbols-outlined" *ngIf="icon">{{ icon }}</span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  isHover = false
  isPressed = false

  @Input() type: 'submit' | 'button' = 'button'
  @Input() size: 'small' | 'normal' | 'large' = 'normal'
  @Input() color: 'primary' | 'secondary' | 'default' = 'default'
  @Input() theme: 'contained' | 'outlined' | 'text' = 'contained'
  @Input() icon?: string
  @Input() ariaLabel?: string
  @Input() disabled = false

  @Output() onClick = new EventEmitter<Event>()

  click(): void {
    this.isPressed = true
    this.onClick.emit()
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
      [`btn-size-${this.size}`]: true,
      [`btn-${this.theme}-disabled`]: this.disabled,
      [`btn-${this.theme}-${this.color}-hover`]: this.isHover,
      [`btn-${this.theme}-${this.color}-pressed`]: this.isPressed,
    }
  }
}
