import { AuthenticationService } from './../../../authentication/authentication.service'
import { Component } from '@angular/core'
import { IMenuItem } from './../../../../components/menu/menu-item.component'

@Component({
  selector: 'hc-dropdown-profile',
  template: `
    <div class="hc-dropdown-container-information">
      <div style="margin-right: 1rem">
        <hc-avatar
          size="large"
          image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
        ></hc-avatar>
      </div>
      <div>
        <div class="body1" style="font-weight: 700">John Doe</div>
        <div class="body2" style="font-weight: 700; color: var(--neutral-gray)">
          john.doe@gmail.com
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
  menu: IMenuItem[] = [
    { label: 'My Profile' },
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

  constructor(private authenticationService: AuthenticationService) {}

  onLogout() {
    this.authenticationService.logout()
  }
}
