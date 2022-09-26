import { Component, Input, ViewEncapsulation } from '@angular/core'

import { IMenuItem } from './menu-item.component'
import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-menu',
  template: `
    <div>
      <ul role="menu">
        <ng-template ngFor let-submenu *ngIf="hasSubMenu()" [ngForOf]="model">
          <li class="hc-menu-separator" *ngIf="submenu.separator" role="separator"></li>
          <li
            *ngIf="!submenu.separator"
            class="hc-submenu-header"
            role="none"
            [ngStyle]="style"
            [attr.data-automationid]="submenu.automationId"
          >
            <span class="body2">{{ submenu.label }}</span>
          </li>
          <ng-template ngFor let-item [ngForOf]="submenu.items">
            <li
              class="hc-menu-item"
              role="none"
              [hc-menu-item]="item"
              [ngStyle]="style"
            ></li>
          </ng-template>
        </ng-template>
        <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
          <li class="hc-menu-separator" *ngIf="item.separator" role="separator"></li>
          <li
            class="hc-menu-item"
            *ngIf="!item.separator"
            [hc-menu-item]="item"
            role="none"
            [ngStyle]="style"
          ></li>
        </ng-template>
      </ul>
    </div>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
      }

      .hc-submenu-header {
        color: var(--neutral-gray);
        padding: 0.75rem 1.25rem;
      }

      .hc-menu-separator {
        border-top: 1px solid var(--neutral-gray-lighter);
        margin: 0.25rem 0;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  @Input() model!: IMenuItem[]
  @Input() style?: IStyle

  hasSubMenu(): boolean {
    if (this.model) {
      for (const item of this.model) {
        if (item.items) {
          return true
        }
      }
    }

    return false
  }

  itemClick(event: Event, item: IMenuItem): void {
    if (!item.url && !item.routerLink) {
      event.preventDefault()
    }

    if (item.command) {
      item.command({ originalEvent: event, item })
    }
  }
}
