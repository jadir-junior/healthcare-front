import { Component, OnInit } from '@angular/core'

import { AppointmentsService } from '../appointments/appointments.service'
import { IAccessKey } from './../../models/access-key.model'
import { IColumn } from './../../components/table/table.component'
import { ILastPatients } from './../appointments/appointments.service'
import { ITimelineEventsAndMettings } from './components/timeline-events-and-meetings/timeline-events-and-meetings.component'
import { TableService } from '../../components/table/table.service'

interface IIntroduction {
  title: string
  description: string
}

interface ILastPatientsDynamic extends ILastPatients, IAccessKey {}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <div>
        <hc-card header="Introduction" [style]="{ 'margin-bottom': '2rem' }">
          <div
            class="wrapper-introduction-information"
            *ngFor="let information of informationsIntroductions"
          >
            <p class="small2">{{ information.title }}</p>
            <p class="body2">{{ information.description }}</p>
          </div>
        </hc-card>
        <hc-card header="Last patients" styleClass="hc-card-body-no-padding">
          <hc-table
            hcData
            hcPagination
            [columns]="tableLastPatients"
            [value]="lastPatients"
            [responsive]="true"
          >
            <ng-template hcTemplate="header" let-columns>
              <tr>
                <th
                  *ngFor="let column of columns"
                  [ngStyle]="column.header === 'Date' ? { 'text-align': 'right' } : null"
                >
                  {{ column.header }}
                </th>
              </tr>
            </ng-template>
            <ng-template hcTemplate="body" let-patient>
              <tr>
                <td style="display: flex; align-items: center">
                  <hc-avatar
                    [image]="patient.photo"
                    [circle]="true"
                    size="small"
                    [style]="{ 'margin-right': '0.5rem' }"
                  ></hc-avatar>
                  {{ patient.name }}
                </td>
                <td>{{ patient.visitTime }}</td>
                <td style="text-align: right">{{ patient.date }}</td>
              </tr>
            </ng-template>
          </hc-table>
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
  providers: [TableService],
})
export class DashboardComponent implements OnInit {
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

  tableLastPatients: IColumn[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Visit Time',
      field: 'visitTime',
    },
    {
      header: 'Date',
      field: 'date',
    },
  ]
  lastPatients: ILastPatientsDynamic[] = []

  constructor(private appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.getLastPatients()
  }

  getLastPatients() {
    this.appointmentsService.getLastPatients().subscribe((patients) => {
      this.lastPatients = patients as ILastPatientsDynamic[]
    })
  }
}
