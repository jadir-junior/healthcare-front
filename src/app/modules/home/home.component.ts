import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

import { BreadcrumbService } from './../../components/breadcrumb/breadcrumb.service'
import { IBreadcrumbItem } from '../../components/breadcrumb/breadcrumb.component'
import { IMe } from '../user/services/user.service'
import { IMenuItem } from './../../components/menu/menu-item.component'
import { Observable } from 'rxjs'
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
      <div style="margin-left: 1rem">
        <hc-breadcrumb [model]="breadcrumbs$ | async"></hc-breadcrumb>
      </div>
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

  breadcrumbs$: Observable<IBreadcrumbItem[]>

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$
    this.breadcrumbs$.subscribe((s) => console.log(s))
  }

  ngOnInit(): void {
    this.getMe()
    // this.buildBreadcrumb(this.route.root)
  }

  getMe(): void {
    this.userService.getMe().subscribe((me) => {
      this.user = me
    })
  }
}
