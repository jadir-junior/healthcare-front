import { AuthenticationService } from './../authentication/authentication.service'
import { Component } from '@angular/core'
import { IMenuItem } from './../../components/menu/menu-item.component'

@Component({
  selector: 'app-home',
  template: ` <div class="wrapper-home">
    <hc-sidebar>
      <div class="wrapper-logo">
        <hc-logo></hc-logo>
      </div>
      <div style="margin: 1.5rem">
        <hc-menu [model]="menuItems"></hc-menu>
      </div>
    </hc-sidebar>
    <div style="width: 100%;">
      <hc-toolbar
        [style]="{
          'padding': '0.5rem 2rem',
          'background-color': 'var(--neutral-background)'
        }"
      >
        <ng-template hcTemplate="left">
          <hc-search placeholder="Search" [style]="{ 'width': '350px' }"></hc-search>
        </ng-template>
        <ng-template hcTemplate="right">
          <div #actualTarget>
            <hc-avatar
              image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              [style]="{ cursor: 'pointer' }"
              (click)="dropdown.toggle($event, actualTarget)"
            ></hc-avatar>
            <hc-dropdown #dropdown [style]="{ width: '275px' }">
              <div class="hc-dropdown-container-information">
                <div style="margin-right: 1rem">
                  <hc-avatar
                    size="large"
                    image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                    (click)="dropdown.toggle($event, actualTarget)"
                  ></hc-avatar>
                </div>
                <div>
                  <div class="body1" style="font-weight: 700">John Doe</div>
                  <div class="body2" style="font-weight: 700; color: var(--neutral-gray)">
                    john.doe@gmail.com
                  </div>
                </div>
              </div>
              <a class="item" (click)="onLogout()">Logout</a>
            </hc-dropdown>
          </div>
        </ng-template>
      </hc-toolbar>
      <div>
        <router-outlet></router-outlet>
      </div>
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

      .wrapper-introduction-information:not(:last-child) {
        margin-bottom: 1rem;
      }

      p.small2 {
        color: var(--neutral-gray);
        margin-bottom: 0.5rem;
      }

      p.body2 {
        color: var(--neutral-black);
      }

      .hc-dropdown-container-information {
        padding: 1rem;
        border-bottom: 1px solid var(--neutral-divider);
        display: flex;
        align-items: center;
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

  constructor(private authenticationService: AuthenticationService) {}

  onLogout() {
    this.authenticationService.logout()
  }
}
