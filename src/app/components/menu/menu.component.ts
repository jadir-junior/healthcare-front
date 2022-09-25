import { IMenuItem } from './menu-item.component'
import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'hc-menu',
  template: `
    <div>
      <ul role="menu">
        <ng-template ngFor let-submenu *ngIf="hasSubMenu()" [ngForOf]="model">
          <li
            class="hc-submenu-header"
            [attr.data-automationid]="submenu.automationId"
            *ngIf="!submenu.separator"
          >
            <span class="body2">{{ submenu.label }}</span>
          </li>
          <ng-template ngFor let-item [ngForOf]="submenu.items">
            <li class="hc-menu-item" role="none" [hc-menu-item]="item"></li>
          </ng-template>
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
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  @Input() model!: IMenuItem[]

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
}
