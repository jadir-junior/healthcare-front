import { Component, Input } from '@angular/core'

@Component({
  selector: 'hc-tab-panel',
  template: `
    <div
      class="hc-tabview-panel"
      role="tabpanel"
      [hidden]="!selected"
      [attr.aria-hidden]="!selected"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [],
})
export class TabPanelComponent {
  _header!: string
  _selected!: boolean

  @Input() get header(): string {
    return this._header
  }

  set header(header: string) {
    this._header = header
  }

  @Input() get selected(): boolean {
    return this._selected
  }

  set selected(val: boolean) {
    this._selected = val
  }
}
