import { Component, OnInit } from '@angular/core'

import { IMe } from '../user/services/user.service'
import { IMenuItem } from './../../components/menu/menu-item.component'
import { UserService } from './../user/services/user.service'

@Component({
  selector: 'app-home',
  template: ` <div class="wrapper-home">
    <hc-sidebar>
      <hc-logo [style]="{ margin: '1.5rem' }"></hc-logo>
      <hc-menu [model]="menuItems" [style]="{ margin: '0.25rem 1.5rem' }"></hc-menu>
    </hc-sidebar>
    <div style="width: 100%;">
      <hc-header [user]="user"></hc-header>
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
export class HomeComponent implements OnInit {
  user!: IMe

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
      items: [
        { label: 'Docs', routerLink: '/docs', icon: 'description' },
        { label: 'Help', routerLink: 'help', icon: 'help' },
      ],
    },
  ]

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getMe()
  }

  getMe(): void {
    this.userService.getMe().subscribe((me) => {
      this.user = me
    })
  }
}
