/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'hc-select-all',
  template: `
    <div class="wrapper-container">
      <div class="wrapper-select-all" data-testid="Select All Component">
        <span
          class="select-all-text"
          [attr.aria-label]="
            selected.length || totalItems - deselected.length + ' of ' + totalItems
          "
        >
          {{ selected.length || totalItems - deselected.length }}
          rows this page selected.
        </span>
        <span
          class="select-all-select"
          (click)="onClick()"
          [attr.aria-label]="!selectAll ? 'select all' : 'clear selected'"
        >
          <span *ngIf="!selectAll">Select all the {{ totalItems }} rows</span>
          <span *ngIf="selectAll">Clear selected</span>
        </span>
      </div>
      <div class="wrapper-buttons">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        display: flex;
        align-items: center;
      }

      .wrapper-select-all {
        background-color: var(--neutral-divider);
        padding: 0.7rem;
      }

      .select-all-text {
        color: var(--neutral-black);
      }

      .select-all-select {
        color: var(--primary-default);
        cursor: pointer;
        font-weight: 700;
        margin-left: 16px;
      }

      .wrapper-buttons {
        margin: 0 0.5rem;
      }
    `,
  ],
})
export class SelectAllComponent {
  @Input() selected: any[] = []
  @Input() deselected: any[] = []
  @Input() totalItems = 0
  @Input() selectAll!: boolean | null

  @Output() clickEvent = new EventEmitter()

  onClick(): void {
    this.clickEvent.emit()
  }
}
