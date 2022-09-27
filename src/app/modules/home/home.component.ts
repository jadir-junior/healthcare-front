import { Component } from '@angular/core'
import { IMenuItem } from './../../components/menu/menu-item.component'

@Component({
  selector: 'app-home',
  template: ` <div class="wrapper-home">
    <hc-sidebar>
      <hc-logo [style]="{ margin: '1.5rem' }"></hc-logo>
      <hc-menu [model]="menuItems" [style]="{ margin: '0.25rem 1.5rem' }"></hc-menu>
    </hc-sidebar>
    <div style="width: 100%;">
      <hc-header></hc-header>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .wrapper-home {
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
      separator: true,
    },
    {
      label: 'SETTINGS',
      items: [{ label: 'Help', routerLink: 'help', icon: 'help' }],
    },
  ]
}
