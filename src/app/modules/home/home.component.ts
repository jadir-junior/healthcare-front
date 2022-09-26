import { AuthenticationService } from './../authentication/authentication.service'
import { IMenuItem } from './../../components/menu/menu-item.component'
import { Component } from '@angular/core'

interface IIntroduction {
  title: string
  description: string
}

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
    <div style="margin: 2rem; width: 100%">
      <div style="margin-bottom: 2rem; display: flex; justify-content: flex-end">
        <div #actualTarget>
          <hc-avatar
            image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            (click)="dropdown.toggle($event, actualTarget)"
            [style]="{ cursor: 'pointer' }"
          ></hc-avatar>
        </div>
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
      <hc-card header="Introduction">
        <div>
          <div
            class="wrapper-introduction-information"
            *ngFor="let information of informationsIntroductions"
          >
            <p class="small2">{{ information.title }}</p>
            <p class="body2">{{ information.description }}</p>
          </div>
        </div>
      </hc-card>
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

  informationsIntroductions: IIntroduction[] = [
    {
      title: 'Address',
      description: '795 Folsom Ave, Suite 600 San Francisco, CADGE 94107',
    },
    {
      title: 'Email',
      description: 'denta@gmail.com',
    },
    {
      title: 'Phone',
      description: '0126596452',
    },
  ]

  constructor(private authenticationService: AuthenticationService) {}

  onLogout() {
    this.authenticationService.logout()
  }
}
