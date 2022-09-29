/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'

import { DataService } from './data.service'
import { ObjectUtils } from 'src/app/common/object-utils/object-utils'
import { SelectDirective } from './select.directive'
import { Subscription } from 'rxjs'
import { TableService } from './table.service'

@Component({
  selector: 'hc-table-header-checkbox',
  template: `
    <div
      class="hc-checkbox"
      [ngClass]="{ 'hc-checkbox-focused': focused, 'hc-checkbox-disabled': isDisabled() }"
      (click)="onClick($event)"
    >
      <div class="hc-checkbox-hidden-accessible">
        <input
          #checkbox
          type="checkbox"
          [checked]="checked"
          [disabled]="isDisabled()"
          [attr.id]="inputId"
          [attr.name]="name"
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
          'hc-disabled': isDisabled()
        }"
        [attr.aria-checked]="checked"
        [attr.data-testid]="ariaLabel"
      >
        <span class="material-symbols-outlined hc-checkbox-icon"> done </span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderCheckboxComponent implements OnInit, OnDestroy {
  @Input() disabled?: string
  @Input() inputId?: string
  @Input() name?: string
  @Input() ariaLabel?: string

  checked!: boolean
  focused!: boolean

  selectionChangeSubscription: Subscription
  valueChangeSubscription: Subscription

  constructor(
    public tableService: TableService,
    public cd: ChangeDetectorRef,
    public select: SelectDirective,
    public data: DataService
  ) {
    this.valueChangeSubscription = this.tableService.valueSource$.subscribe(() => {
      this.checked = this.updateCheckedState()
    })

    this.selectionChangeSubscription = this.tableService.selectionSource$.subscribe(
      () => {
        this.checked = this.updateCheckedState()
      }
    )
  }

  ngOnInit(): void {
    this.checked = this.updateCheckedState()
  }

  onClick(event: Event) {
    if (!this.disabled) {
      if (this.data.value && this.data.value.length > 0) {
        this.select.toggleRowsWithCheckbox(event, !this.checked)
      }
    }
  }

  onFocus() {
    this.focused = true
  }

  onBlur() {
    this.focused = false
  }

  isDisabled() {
    return this.disabled || !this.data.value || !this.data.value.length
  }

  checkIfAllRowsIsDeselected(): boolean {
    const data = this.data.processedData

    return (
      ObjectUtils.isNotEmpty(data) &&
      ObjectUtils.isNotEmpty(this.select.deselection) &&
      data.every((v: any) =>
        this.select.deselection.some((s: any) => this.select.equals(v, s))
      )
    )
  }

  updateCheckedState(): boolean {
    this.cd.markForCheck()

    if (this.select.selectAll === true) {
      return !this.checkIfAllRowsIsDeselected()
    } else {
      const data = this.select.selectionPageOnly
        ? this.data.dataToRender(this.data.processedData)
        : this.data.processedData

      const val = data

      const selectableVal = this.select.rowSelectable
        ? val.filter((data: any, index: number) =>
            this.select.rowSelectable({ data, index })
          )
        : val

      return (
        ObjectUtils.isNotEmpty(selectableVal) &&
        ObjectUtils.isNotEmpty(this.select.selection) &&
        selectableVal.every((v: any) =>
          this.select.selection.some((s: any) => this.select.equals(v, s))
        )
      )
    }
  }

  ngOnDestroy(): void {
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe()
    }

    if (this.selectionChangeSubscription) {
      this.selectionChangeSubscription.unsubscribe()
    }
  }
}
