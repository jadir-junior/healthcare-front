/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input } from '@angular/core'

import { IsActiveMatchOptions } from '@angular/router'
import { MenuComponent } from './menu.component'

interface ICommand {
  originalEvent: Event
  item: IMenuItem
}

export interface IMenuItem {
  automationId?: any
  disabled?: boolean
  command?: (object: ICommand) => void
  items?: IMenuItem[]
  icon?: string
  label?: string
  queryParams?: { [key: string]: string | number }
  routerLink?: any
  routerLinkActiveOptions?: IsActiveMatchOptions
  separator?: boolean
  url?: string
}

@Component({
  selector: '[hc-menu-item]',
  template: `
    <a
      *ngIf="!item.routerLink"
      class="hc-menu-item-link subtitle2"
      role="menuitem"
      (click)="menu.itemClick($event, item)"
    >
      <span *ngIf="item?.icon" class="material-symbols-outlined hc-menu-item-icon">
        {{ item.icon }}
      </span>
      <span class="hc-menu-item-text">{{ item.label }}</span>
    </a>
    <a
      *ngIf="item.routerLink"
      class="hc-menu-item-link subtitle2"
      role="menuitem"
      routerLinkActive="hc-menu-item-link-active"
      [routerLink]="item.routerLink"
      [queryParams]="item.queryParams"
      [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
    >
      <span *ngIf="item?.icon" class="material-symbols-outlined hc-menu-item-icon">
        {{ item.icon }}
      </span>
      <span class="hc-menu-item-text">{{ item.label }}</span>
    </a>
  `,
  styles: [
    `
      .hc-menu-item-link {
        text-decoration: none;
        color: var(--neutral-gray-dark);
        padding: 0.75rem 1.25rem;
        display: flex;
        align-items: center;
        font-size: 1rem;
        border-radius: 0.5rem;
        cursor: pointer;

        .hc-menu-item-icon {
          margin-right: 0.5rem;
          font-size: 20px;
          color: var(--neutral-gray-lighter);
        }
      }

      .hc-menu-item-link:hover {
        background-color: var(--primary-lightest);
        color: var(--primary-default);

        .hc-menu-item-icon {
          color: var(--primary-default);
        }
      }

      .hc-menu-item-link-active {
        background-color: var(--primary-lightest);
        color: var(--primary-default);

        .hc-menu-item-icon {
          color: var(--primary-default);
        }
      }
    `,
  ],
})
export class MenuItemComponent {
  @Input('hc-menu-item') item!: IMenuItem

  menu: MenuComponent

  constructor(public menuComponent: MenuComponent) {
    this.menu = menuComponent
  }
}
