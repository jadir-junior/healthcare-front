import { ActivatedRoute, Router } from '@angular/router'
import { Component, Input } from '@angular/core'

import { AuthenticationService } from './../../../authentication/authentication.service'
import { IMe } from './../../../user/services/user.service'
import { IMenuItem } from './../../../../components/menu/menu-item.component'

@Component({
  selector: 'hc-dropdown-profile',
  template: `
    <div class="hc-dropdown-container-information" *ngIf="user">
      <div style="margin-right: 1rem">
        <hc-avatar size="large" [image]="user.photo"></hc-avatar>
      </div>
      <div>
        <div class="body1" style="font-weight: 700">{{ user.name }}</div>
        <div class="body2" style="font-weight: 700; color: var(--neutral-gray)">
          {{ user.email }}
        </div>
      </div>
    </div>
    <hc-menu [model]="menu" [style]="{ margin: '0.25rem 1rem' }"></hc-menu>
  `,
  styles: [
    `
      .hc-dropdown-container-information {
        padding: 1rem;
        border-bottom: 1px solid var(--neutral-divider);
        display: flex;
        align-items: center;
      }
    `,
  ],
})
export class DropdownProfileComponent {
  @Input() user!: IMe

  menu: IMenuItem[] = [
    {
      label: 'My Profile',
      command: () => {
        this.goTo('user')
      },
    },
    { label: 'My Appontiments' },
    {
      separator: true,
    },
    { label: 'Account Settings' },
    {
      label: 'Sign Out',
      command: () => {
        this.onLogout()
      },
    },
  ]

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  goTo(path: string): void {
    this.router.navigate([path], { relativeTo: this.route })
  }

  onLogout() {
    this.authenticationService.logout()
  }
}
