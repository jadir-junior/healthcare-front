import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
} from '@angular/core'

import { QueryList } from '@angular/core'
import { TabPanelComponent } from './tab-panel.component'

@Component({
  selector: 'hc-tabs',
  template: `
    <div class="hc-tabview">
      <div class="hc-tabview-nav-container">
        <div class="hc-tabview-nav-content">
          <ul class="hc-tabview-nav" role="tablist">
            <ng-template ngFor let-tab [ngForOf]="tabs">
              <li
                role="presentation"
                [ngClass]="{ 'hc-tabview-highlight': tab.selected }"
              >
                <a
                  role="tab"
                  class="hc-tabview-nav-link"
                  [attr.aria-selected]="tab.selected"
                  (click)="open(tab)"
                >
                  <span class="hc-tabview-title">{{ tab.header }}</span>
                </a>
              </li>
            </ng-template>
          </ul>
        </div>
      </div>
      <div class="hc-tabview-panels">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['tabs.component.scss'],
})
export class TabsComponent implements AfterContentInit {
  tabs!: TabPanelComponent[]

  @ContentChildren(TabPanelComponent) tabPanels!: QueryList<TabPanelComponent>

  constructor(public cd: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.initTabs()
  }

  findSelectedTab(): TabPanelComponent | null {
    const tab = this.tabs.find((tab) => tab.selected)

    if (tab) {
      return tab
    }

    return null
  }

  initTabs(): void {
    this.tabs = this.tabPanels.toArray()
    const selectedTab = this.findSelectedTab()
    if (!selectedTab && this.tabs.length) {
      this.tabs[0].selected = true
    }

    this.cd.markForCheck()
  }

  open(tab: TabPanelComponent) {
    if (!tab.selected) {
      const selectedTab = this.findSelectedTab()

      if (selectedTab) {
        selectedTab.selected = false
      }

      tab.selected = true
    }
  }
}
