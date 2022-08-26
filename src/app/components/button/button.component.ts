import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'hc-button',
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [ngClass]="{
        'btn-primary': color === 'primary',
        'btn-primary-hover': isHover,
        'btn-primary-pressed': isPressed
      }"
      [attr.aria-label]="ariaLabel"
      (mouseenter)="onMouseEnter()"
      (mouseleave)="onMouseLeave()"
      (click)="onClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      button {
        display: flex;
        align-items: center;
        color: var(--neutral-white);
        font-weight: bold;
        font-size: 16px;
        padding: 16px 24px;
        border-radius: 8px;
        background-color: var(--neutral-gray);
        border: none;
        cursor: pointer;
        transition: 0.3s;
      }

      button:disabled {
        background-color: var(--neutral-background);
        color: var(--neutral-divider);
      }

      .btn-primary {
        background-color: var(--primary-default);
      }

      .btn-primary-hover {
        background-color: var(--primary-hover);
      }

      .btn-primary-pressed {
        background-color: var(--primary-dark);
      }
    `,
  ],
})
export class ButtonComponent {
  isHover = false
  isPressed = false

  @Input() type: 'submit' | 'button' = 'button'
  @Input() color: 'primary' | 'default' = 'default'
  @Input() ariaLabel?: string
  @Input() disabled = false

  @Output() clickEvent = new EventEmitter()

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
}
