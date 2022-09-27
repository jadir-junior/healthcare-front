import { Component } from '@angular/core'

interface IIntroduction {
  title: string
  description: string
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <div>
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
      <div>
        <hc-card header="Events">
          <hc-timeline [value]="events">
            <ng-template hcTemplate="marker" let-event>
              <span class="custom-marker" [style.backgroundColor]="event.color">
                <hc-icon
                  [icon]="event.icon"
                  [style]="{ color: 'var(--neutral-white)' }"
                ></hc-icon>
              </span>
            </ng-template>
            <ng-template hcTemplate="content" let-event>
              <div style="margin-bottom: 2.5rem;">
                <div
                  style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; width: 100%;"
                >
                  <div class="subtitle1" style="color: var(--neutral-black);">
                    {{ event.status }}
                  </div>
                  <div
                    class="small2"
                    style="color: var(--neutral-gray); display: flex; align-items: center;"
                  >
                    {{ event.date | date: 'short' }}
                    <hc-icon
                      size="small"
                      icon="schedule"
                      [style]="{ 'margin-left': '0.5rem' }"
                    ></hc-icon>
                  </div>
                </div>
                <div class="body2" style="color: var(--neutral-gray-dark)">
                  {{ event.description }}
                </div>
              </div>
            </ng-template>
          </hc-timeline>
        </hc-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 2rem;
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

      .custom-marker {
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        z-index: 1;
      }
    `,
  ],
})
export class DashboardComponent {
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

  events = [
    {
      status: 'New prescription',
      date: new Date(),
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      icon: 'monitor_heart',
      color: '#FAC032',
    },
    {
      status: 'Appointment',
      date: new Date(),
      description:
        'Esse sanctus ea nec. An nam nonumy veritus theophrastus. No laoreet intellegebat pro, ea omnes graecis eloquentiam quo.',
      icon: 'local_hospital',
      color: '#FF6760',
    },
    {
      status: 'Medication',
      date: new Date(),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nam nisi veniam.',
      icon: 'vaccines',
      color: '#558EFF',
    },
    {
      status: 'Operation',
      date: new Date(),
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      icon: 'healing',
      color: '#16D090',
    },
  ]
}
