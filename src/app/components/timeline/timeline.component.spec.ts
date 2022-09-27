import { render, screen } from '@testing-library/angular'

import { TemplateModule } from '../../directives/template/template.module'
import { TimelineComponent } from './timeline.component'

const EVENTS = [
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

describe('TimelineComponent', () => {
  it('create timeline with marker and content', async () => {
    await render(
      `<hc-timeline [value]="events">
      <ng-template hcTemplate="marker" let-event>
        <i role="icon">{{event.icon}}</i>
      </ng-template>
      <ng-template hcTemplate="content" let-event>
        <h3>{{event.status}}</h3>
      </ng-template>
    </hc-timeline>`,
      {
        declarations: [TimelineComponent],
        imports: [TemplateModule],
        componentProperties: {
          events: EVENTS,
        },
      }
    )

    expect(screen.getAllByRole('icon').length).toBe(4)
    expect(screen.getByText(/new prescription/i)).toBeInTheDocument()
    expect(screen.getByText(/appointment/i)).toBeInTheDocument()
    expect(screen.getByText(/medication/i)).toBeInTheDocument()
    expect(screen.getByText(/operation/i)).toBeInTheDocument()
  })
})
