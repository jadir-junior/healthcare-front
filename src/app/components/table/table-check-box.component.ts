/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'

import { SelectDirective } from './select.directive'
import { Subscription } from 'rxjs'
import { TableComponent } from './table.component'
import { TableService } from './table.service'

@Component({
  selector: 'hc-table-check-box',
  template: `
    <div
      (click)="onClick($event)"
      [ngClass]="{ 'hc-checkbox-focused': focused, 'hc-checkbox-disabled': disabled }"
      class="hc-checkbox"
    >
      <div class="hc-checkbox-hidden-accessible">
        <input
          type="checkbox"
          [checked]="checked"
          [disabled]="disabled"
          [attr.id]="inputId"
          [attr.name]="name"
          [attr.required]="required"
          [attr.aria-label]="ariaLabel"
          (focus)="onFocus()"
          (blur)="onBlur()"
        />
      </div>
      <div
        #box
        role="checkbox"
        [ngClass]="{
          'hc-checkbox-box': true,
          'hc-checkbox-highlight': checked,
          'hc-focus': focused,
          'hc-disabled': disabled
        }"
        [attr.aria-checked]="checked"
      >
        <span class="material-symbols-outlined hc-checkbox-icon"> done </span>
      </div>
    </div>
  `,
  styles: [],
})
export class TableCheckBoxComponent implements OnInit, OnDestroy {
  @Input() disabled!: boolean
  @Input() value!: any
  @Input() name?: string
  @Input() index!: number
  @Input() inputId?: string
  @Input() required?: boolean
  @Input() ariaLabel?: string

  checked!: boolean
  focused!: boolean
  subscription: Subscription

  constructor(
    public dt: TableComponent,
    public tableService: TableService,
    public cd: ChangeDetectorRef,
    public select: SelectDirective
  ) {
    this.subscription = this.tableService.selectionSource$.subscribe(() => {
      if (this.select.selectAll) {
        this.checked = true
      } else {
        this.checked = this.select.isSelected(this.value)
      }

      this.cd.markForCheck()
    })
  }

  ngOnInit(): void {
    if (this.select.selectAll) {
      this.checked = true
    } else {
      this.checked = this.select.isSelected(this.value)
    }
  }

  onClick(event: Event) {
    if (!this.disabled) {
      this.select.toggleRowWithCheckbox(
        {
          originalEvent: event,
          rowIndex: this.index,
        },
        this.value
      )
    }
  }

  onFocus() {
    this.focused = true
  }

  onBlur() {
    this.focused = false
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
