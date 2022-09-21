/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'

import { DataDirective } from './data.directive'
import { ObjectUtils } from 'src/app/common/object-utils/object-utils'
import { TableService } from './table.service'

interface IRowSelectEvent {
  originalEvent: Event
  index: number
  data: any
  type: 'checkbox'
}

export interface IHeaderCheckboxEvent {
  originalEvent: Event
  checked: boolean
}

@Directive({
  selector: '[hcSelect]',
})
export class SelectDirective implements OnChanges {
  private _selectAll: boolean | null = null

  private _selection: any
  private _deselection: any

  selectionKeys: any = {}
  deselectionKeys: any = {}

  preventSelectionSetterPropagation!: boolean

  @Input() dataKey?: string
  @Input() rowSelectable?: any
  @Input() stateKey?: string
  @Input() selectionPageOnly?: boolean
  @Input() compareSelectionBy = 'deepEquals'

  @Input() get selection(): any {
    return this._selection
  }

  set selection(val: any) {
    this._selection = val
  }

  @Input() get deselection(): any {
    return this._deselection
  }

  set deselection(val: any) {
    this._deselection = val
  }

  @Input() get selectAll(): boolean | null {
    return this._selectAll
  }

  set selectAll(val: boolean | null) {
    this._selectAll = val
  }

  @Output() selectionChange = new EventEmitter()
  @Output() deselectionChange = new EventEmitter<any>()
  @Output() headerCheckboxToggleEvent = new EventEmitter<IHeaderCheckboxEvent>()
  @Output() rowUnselectEvent = new EventEmitter<IRowSelectEvent>()
  @Output() rowSelectEvent = new EventEmitter<IRowSelectEvent>()
  @Output() selectAllChange = new EventEmitter<IHeaderCheckboxEvent>()

  constructor(private tableService: TableService, public data: DataDirective) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selection']) {
      this.selection = changes['selection'].currentValue

      if (!this.preventSelectionSetterPropagation) {
        this.updateSelectionKeys()
        this.tableService.onSelectionChange()
      }

      this.preventSelectionSetterPropagation = false
    }

    if (changes['selectAll']) {
      this.selectAll = changes['selectAll'].currentValue

      if (!this.preventSelectionSetterPropagation || !this.selectAll) {
        setTimeout(() => {
          this.deselection = []
          this.selection = []
          this.selectionChange.emit(this.selection)
          this.deselectionChange.emit(this.deselection)
          this.tableService.onSelectionChange()
        })
      }

      this.preventSelectionSetterPropagation = false
    }
  }

  isRowSelectable(data: any, index: number): boolean {
    if (this.rowSelectable && !this.rowSelectable({ data, index })) {
      return false
    }

    return true
  }

  isSelected(rowData: any): boolean {
    if (rowData && this.selection) {
      if (this.dataKey) {
        return (
          this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !==
          undefined
        )
      } else {
        if (this.selection instanceof Array) {
          return this.findIndexInSelection(rowData, this.selection) > -1
        } else {
          return this.equals(rowData, this.selection)
        }
      }
    }

    return false
  }

  isDeselected(rowData: any): boolean {
    if (rowData && this.deselection) {
      if (this.dataKey) {
        return (
          this.deselectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !==
          undefined
        )
      } else {
        if (this.deselection instanceof Array) {
          return this.findIndexInSelection(rowData, this.deselection) > -1
        } else {
          return this.equals(rowData, this.deselection)
        }
      }
    }

    return false
  }

  findIndexInSelection(rowData: any, selectionOrDeselection: any) {
    let index = -1
    if (selectionOrDeselection && selectionOrDeselection.length) {
      for (let i = 0; i < selectionOrDeselection.length; i++) {
        if (this.equals(rowData, selectionOrDeselection[i])) {
          index = i
          break
        }
      }
    }

    return index
  }

  equals(data1: any, data2: any) {
    return this.compareSelectionBy === 'equals'
      ? data1 === data2
      : ObjectUtils.equals(data1, data2, this.dataKey)
  }

  private verifySelectionOrDesectionAndUpdateKeys(
    selectKeys: 'selectionKeys' | 'deselectionKeys',
    selectionOrDeselection: 'selection' | 'deselection'
  ) {
    this[selectKeys] = {}
    if (Array.isArray(this[selectionOrDeselection])) {
      for (const data of this[selectionOrDeselection]) {
        this[selectKeys][String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1
      }
    } else {
      this[selectKeys][
        String(ObjectUtils.resolveFieldData(this[selectionOrDeselection], this.dataKey))
      ] = 1
    }
  }

  updateSelectionKeys() {
    if (this.dataKey && this.selection?.length !== null && !this.selectAll) {
      this.verifySelectionOrDesectionAndUpdateKeys('selectionKeys', 'selection')
    } else if (this.dataKey && this.deselection?.length !== null) {
      this.verifySelectionOrDesectionAndUpdateKeys('deselectionKeys', 'deselection')
    }
  }

  toggleRowsWithCheckbox(event: Event, check: boolean) {
    if (this.selectAll === true) {
      this.deselectAllWithSelectAllTrue(event, check)
    } else {
      const data = this.selectionPageOnly
        ? this.data.dataToRender(this.data.processedData)
        : this.data.processedData

      let selection =
        this.selectionPageOnly && this.selection
          ? this.selection.filter((s: any) => !data.some((d: any) => this.equals(s, d)))
          : []

      if (check) {
        selection = [...selection, ...data]
        selection = this.rowSelectable
          ? selection.filter((data: any, index: number) =>
              this.rowSelectable({ data, index })
            )
          : selection
      }

      this.selection = selection
      this.preventSelectionSetterPropagation = true
      this.updateSelectionKeys()
      this.selectionChange.emit(this.selection)
      this.tableService.onSelectionChange()
      this.headerCheckboxToggleEvent.emit({ originalEvent: event, checked: check })
    }
  }

  private deselectAllWithSelectAllTrue(event: Event, check: boolean) {
    const data = this.data.processedData
    let deselection: any[] = []

    if (!check) {
      deselection = [...this.deselection, ...data]
      deselection = this.rowSelectable
        ? deselection.filter((data: any, index: number) =>
            this.rowSelectable({ data, index })
          )
        : deselection
    } else {
      deselection = this.deselection.filter(
        (s: any) => !data.some((d: any) => this.equals(s, d))
      )
    }

    this.deselection = deselection
    this.preventSelectionSetterPropagation = true
    this.updateSelectionKeys()
    this.deselectionChange.emit(this.deselection)
    this.tableService.onSelectionChange()
    this.headerCheckboxToggleEvent.emit({ originalEvent: event, checked: check })
  }

  toggleRowWithCheckbox(event: { originalEvent: Event; rowIndex: number }, rowData: any) {
    if (!this.selectAll) {
      this.selectRowWithCheckbox(event, rowData)
    } else {
      this.deselectRowWithCheckbox(event, rowData)
    }
  }

  private selectRowWithCheckbox(
    event: { originalEvent: Event; rowIndex: number },
    rowData: any
  ) {
    this.selection = this.selection || []
    const selected = this.isSelected(rowData)

    const dataKeyValue = this.dataKey
      ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey))
      : null

    this.preventSelectionSetterPropagation = true

    if (selected) {
      const selectionIndex = this.findIndexInSelection(rowData, this.selection)
      this.selection = this.selection.filter((_: any, i: number) => i != selectionIndex)
      this.selectionChange.emit(this.selection)

      if (dataKeyValue) {
        delete this.selectionKeys[dataKeyValue]
      }
    } else {
      if (!this.isRowSelectable(rowData, event.rowIndex)) {
        return
      }

      this.selection = this.selection ? [...this.selection, rowData] : [rowData]

      this.selectionChange.emit(this.selection)

      if (dataKeyValue) {
        this.selectionKeys[dataKeyValue] = 1
      }
    }

    this.tableService.onSelectionChange()
  }

  private deselectRowWithCheckbox(
    event: { originalEvent: Event; rowIndex: number },
    rowData: any
  ) {
    this.deselection = this.deselection || []
    const deselected = this.isDeselected(rowData)

    const dataKeyValue = this.dataKey
      ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey))
      : null

    this.preventSelectionSetterPropagation = true

    if (deselected) {
      const selectionIndex = this.findIndexInSelection(rowData, this.deselection)
      this.deselection = this.deselection.filter(
        (_: any, i: number) => i != selectionIndex
      )
      this.deselectionChange.emit(this.deselection)

      if (dataKeyValue) {
        delete this.deselectionKeys[dataKeyValue]
      }
    } else {
      if (!this.isRowSelectable(rowData, event.rowIndex)) {
        return
      }

      this.deselection = this.deselection ? [...this.deselection, rowData] : [rowData]

      this.deselectionChange.emit(this.deselection)

      if (dataKeyValue) {
        this.deselectionKeys[dataKeyValue] = 1
      }
    }

    this.tableService.onSelectionChange()
  }
}
