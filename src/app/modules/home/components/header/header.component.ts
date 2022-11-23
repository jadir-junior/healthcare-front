import { Component, Input } from '@angular/core'

import { IItemNotification } from './../dropdown-notifications/dropdown-notifications.component'
import { IMe } from './../../../user/services/user.service'

@Component({
  selector: 'hc-header',
  template: `
    <header>
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
          <div class="wrapper-button-and-badge">
            <hc-badge value="5"></hc-badge>
            <hc-button
              icon="notifications"
              theme="text"
              [style]="{
                'margin-right': '0.5rem'
              }"
              (onClick)="dropdownNotificiations.toggle($event)"
            ></hc-button>
            <hc-dropdown
              #dropdownNotificiations
              [style]="{ width: '375px' }"
              [styleContent]="{ padding: '0' }"
            >
              <hc-dropdown-notifications
                [reports]="5"
                [notifications]="notitifcations"
              ></hc-dropdown-notifications>
            </hc-dropdown>
          </div>
          <div *ngIf="user">
            <hc-avatar
              [image]="user.photo"
              [style]="{ cursor: 'pointer' }"
              (click)="dropdown.toggle($event)"
            ></hc-avatar>
            <hc-dropdown #dropdown [style]="{ width: '275px' }">
              <hc-dropdown-profile [user]="user"></hc-dropdown-profile>
            </hc-dropdown>
          </div>
        </ng-template>
      </hc-toolbar>
    </header>
  `,
  styles: [
    `
      .wrapper-button-and-badge {
        position: relative;

        hc-badge {
          position: absolute;
          right: 0.5rem;
          border: 3px solid var(--neutral-background);
          border-radius: 50%;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  @Input() user!: IMe

  notitifcations: IItemNotification[] = [
    {
      color: '#fac032',
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      icon: 'monitor_heart',
      timeAgo: '1 hr',
      title: 'New Description',
    },
    {
      color: '#ff6760',
      description:
        'Esse sanctus ea nec. An nam nonumy veritus theophrastus. No laoreet intellegebat pro, ea omnes graecis eloquentiam quo.',
      icon: 'local_hospital',
      timeAgo: '2 hr',
      title: 'Appointment',
    },
    {
      color: '#558eff',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.',
      icon: 'vaccines',
      timeAgo: '5 hr',
      title: 'Medication',
    },
    {
      color: '#16d090',
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      icon: 'healing',
      timeAgo: '2 days',
      title: 'Operation',
    },
  ]
}
