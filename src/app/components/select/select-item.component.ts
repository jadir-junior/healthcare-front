import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core'

export interface ISelectItem<T> {
  label?: string
  value: T
  styleClass?: string
  icon?: string
  title?: string
  disabled?: boolean
}

@Component({
  selector: 'hc-select-item',
  template: `
    <li
      role="option"
      [id]="selected ? 'hc-select-highlight-option' : ''"
      [attr.aria-label]="label"
      [attr.aria-selected]="selected"
      [ngClass]="classes"
      (click)="onOptionClick($event)"
    >
      <span *ngIf="!template">{{ label || 'empty' }}</span>
      <ng-container
        *ngTemplateOutlet="template; context: { $implicit: option }"
      ></ng-container>
    </li>
  `,
  styleUrls: ['select.component.scss'],
})
export class SelectItemComponent<T> {
  @Input() label?: string
  @Input() selected = false
  @Input() option!: ISelectItem<T>
  @Input() template!: TemplateRef<HTMLElement>

  @Output() onClick = new EventEmitter<{ originalEvent: Event; option: ISelectItem<T> }>()

  onOptionClick(event: Event) {
    this.onClick.emit({ originalEvent: event, option: this.option })
  }

  get classes() {
    return {
      ['hc-select-item']: true,
      ['hc-select-item-highlight']: this.selected,
    }
  }
}
