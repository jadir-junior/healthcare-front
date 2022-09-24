import { IMenuItem } from './../../components/menu/menu-item.component'
import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  template: `<div class="wrapper-home">
    <hc-sidebar>
      <div style="margin: 1.5rem">
        <hc-menu [model]="menuItems"></hc-menu>
      </div>
    </hc-sidebar>
    <div></div>
  </div>`,
  styles: [
    `
      .wrapper-home {
        height: 100%;
        display: flex;
      }
    `,
  ],
})
export class HomeComponent {
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
}
