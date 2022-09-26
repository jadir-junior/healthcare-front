import { Component } from '@angular/core'

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
            ></hc-button>
          </div>
          <div #actualTarget>
            <hc-avatar
              image="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              [style]="{ cursor: 'pointer' }"
              (click)="dropdown.toggle($event, actualTarget)"
            ></hc-avatar>
            <hc-dropdown #dropdown [style]="{ width: '275px' }">
              <hc-dropdown-profile></hc-dropdown-profile>
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
export class HeaderComponent {}
