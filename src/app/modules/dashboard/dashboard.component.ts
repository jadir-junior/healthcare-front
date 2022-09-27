import { Component } from '@angular/core'
import { ITimelineEventsAndMettings } from './components/timeline-events-and-meetings/timeline-events-and-meetings.component'

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
        <hc-card>
          <hc-timeline-events-and-meetings
            title="Events"
            [timeline]="events"
          ></hc-timeline-events-and-meetings>
          <hc-timeline-events-and-meetings
            title="Meetings"
            [timeline]="meetings"
          ></hc-timeline-events-and-meetings>
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

  events: ITimelineEventsAndMettings[] = [
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

  meetings: ITimelineEventsAndMettings[] = [
    {
      status: 'New patient',
      date: new Date(),
      description:
        'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit.',
      icon: 'personal_injury',
      color: '#E74F48',
    },
    {
      status: 'Examination',
      date: new Date(),
      description:
        'Esse sanctus ea nec. An nam nonumy veritus theophrastus. No laoreet intellegebat pro, ea omnes graecis eloquentiam quo.',
      icon: 'radiology',
      color: '#EFAD0A',
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
      status: 'Appointment',
      date: new Date(),
      description:
        'Esse sanctus ea nec. An nam nonumy veritus theophrastus. No laoreet intellegebat pro, ea omnes graecis eloquentiam quo.',
      icon: 'local_hospital',
      color: '#FF6760',
    },
  ]
}
