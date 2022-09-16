/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'

import { ObjectUtils } from 'src/app/common/object-utils/object-utils'
import { Subscription } from 'rxjs'
import { TableComponent } from './table.component'
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
    public dt: TableComponent,
    public tableService: TableService,
    public cd: ChangeDetectorRef
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
      if (this.dt.value && this.dt.value.length > 0) {
        this.dt.toggleRowsWithCheckbox(event, !this.checked)
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
    return this.disabled || !this.dt.value || !this.dt.value.length
  }

  updateCheckedState(): boolean {
    this.cd.markForCheck()

    if (this.dt._selectAll !== null) {
      return this.dt._selectAll
    } else {
      const data = this.dt.selectionPageOnly
        ? this.dt.dataToRender(this.dt.processedData)
        : this.dt.processedData
      const val = data
      const selectableVal = this.dt.rowSelectable
        ? val.filter((data: any, index: number) => this.dt.rowSelectable({ data, index }))
        : val

      return (
        ObjectUtils.isNotEmpty(selectableVal) &&
        ObjectUtils.isNotEmpty(this.dt.selection) &&
        selectableVal.every((v: any) =>
          this.dt.selection.some((s: any) => this.dt.equals(v, s))
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
