import { AuthenticationService } from './../authentication/authentication.service'
import { IMenuItem } from './../../components/menu/menu-item.component'
import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `<div class="wrapper-home">
    <hc-sidebar>
      <div class="wrapper-logo">
        <hc-logo></hc-logo>
      </div>
      <div style="margin: 1.5rem">
        <hc-menu [model]="menuItems"></hc-menu>
      </div>
    </hc-sidebar>
    <div style="margin: 2rem">
      <button label="custom target" (click)="dropdown.toggle($event)">Dropdown</button>
      <hc-dropdown #dropdown [style]="{ width: '112px' }">
        <a class="item" (click)="onLogout()">Logout</a>
      </hc-dropdown>
    </div>
  </div>`,
  styles: [
    `
      .wrapper-home {
        height: 100%;
        display: flex;
      }

      .wrapper-logo {
        margin: 1.5rem;
      }

      .item {
        padding: 0.5rem 1.5rem;
        cursor: pointer;
        display: block;
        color: var(--neutral-black);

        &:hover {
          background-color: var(--neutral-gray-lighter);
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private authenticationService: AuthenticationService) {}

  menuItems: IMenuItem[] = [
    {
      label: 'MEDICINE',
      items: [
        { label: 'Dashboard', routerLink: 'dashboard', icon: 'dashboard' },
        { label: 'Appontiments', routerLink: 'appointments', icon: 'vaccines' },
        { label: 'Doctors', routerLink: 'doctors', icon: 'medication_liquid' },
        { label: 'Departaments', routerLink: 'departaments', icon: 'group' },
        { label: 'Patients', routerLink: 'patients', icon: 'badge' },
        { label: 'Payments', routerLink: 'payments', icon: 'payments' },
      ],
    },
    {
      label: 'SETTINGS',
      items: [{ label: 'Help', routerLink: 'help', icon: 'help' }],
    },
  ]

  onLogout() {
    this.authenticationService.logout()
  }
}
