import { render, screen } from '@testing-library/angular'

import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TemplateModule } from '../../directives/template/template.module'
import { TimelineComponent } from './timeline.component'
import { TimelineModule } from './timeline.module'

describe('TimelineComponent', () => {
  it('create timeline with marker and content', async () => {
    await render(
      `<hc-timeline [value]="events">
      <ng-template hcTemplate="marker" let-event>
        <i role="icon">{{event.icon}}</i>
      </ng-template>
      <ng-template hcTemplate="connector" let-event>
        <div
          class="hc-custom-connector"
          [ngClass]="{ 'hc-custom-connector-primary': event === 2022 }"
        ></div>
      </ng-template>
      <ng-template hcTemplate="content" let-event>
        <h3>{{event.status}}</h3>
      </ng-template>
    </hc-timeline>`,
      {
        declarations: [TimelineComponent],
        imports: [TemplateModule],
        componentProperties: {
          events: [
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
          ],
        },
      }
    )

    expect(screen.getAllByRole('icon').length).toBe(4)
    expect(screen.getByText(/new prescription/i)).toBeInTheDocument()
    expect(screen.getByText(/appointment/i)).toBeInTheDocument()
    expect(screen.getByText(/medication/i)).toBeInTheDocument()
    expect(screen.getByText(/operation/i)).toBeInTheDocument()
  })

  it('create a timeline horizontal', async () => {
    await render(
      `<hc-timeline [value]="eventsYears" layout="horizontal">
      <ng-template hcTemplate="content" let-event>{{event}}</ng-template>
    </hc-timeline>`,
      {
        componentProperties: {
          eventsYears: [2020, 2021, 2022, 2023, ''],
        },
        schemas: [NO_ERRORS_SCHEMA],
        imports: [TimelineModule, TemplateModule],
      }
    )

    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText('2021')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('timeline with opposite', async () => {
    await render(
      `<hc-timeline [value]="eventsOpposite">
      <ng-template hcTemplate="content" let-event><small>{{event.date | date: 'short'}}</small></ng-template>
      <ng-template hcTemplate="opposite" let-event>
        {{event.status}}
      </ng-template>
    </hc-timeline>`,
      {
        componentProperties: {
          eventsOpposite: [
            {
              status: 'Ordered',
              date: new Date('2022-12-21T10:30'),
            },
            {
              status: 'Processing',
              date: new Date('2022-12-21T14:00'),
            },
            {
              status: 'Shipped',
              date: new Date('2022-12-21T16:15'),
            },
            {
              status: 'Delivered',
              date: new Date('2022-12-22T10:00'),
            },
          ],
        },
        schemas: [NO_ERRORS_SCHEMA],
        imports: [TimelineModule, TemplateModule],
      }
    )

    expect(screen.getByText('Ordered')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Shipped')).toBeInTheDocument()
    expect(screen.getByText('Delivered')).toBeInTheDocument()
    expect(screen.getByText('12/21/22, 10:30 AM')).toBeInTheDocument()
    expect(screen.getByText('12/21/22, 2:00 PM')).toBeInTheDocument()
    expect(screen.getByText('12/21/22, 4:15 PM')).toBeInTheDocument()
    expect(screen.getByText('12/22/22, 10:00 AM')).toBeInTheDocument()
  })
})
