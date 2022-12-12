import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ILastPayments, PaymentsService } from '../../services/payments/payments.service'

import { AppointmentsService } from '../appointments/appointments.service'
import { IColumn } from './../../components/table/table.component'
import { ILastPatients } from './../appointments/appointments.service'
import { ITimelineEventsAndMettings } from './components/timeline-events-and-meetings/timeline-events-and-meetings.component'
import { TableService } from '../../components/table/table.service'

interface IIntroduction {
  title: string
  description: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers: [TableService],
})
export class DashboardComponent implements OnInit {
  form: FormGroup = this.fb.group({
    textarea: [{ value: 'Test area', disabled: true }, [Validators.required]],
  })

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

  columnsLastPayments: IColumn[] = [
    {
      header: 'Date',
      field: 'date',
    },
    {
      header: 'Recipient',
      field: 'recipient',
    },
    {
      header: 'Amount',
      field: 'amount',
    },
  ]

  lastPayments: ILastPayments[] = []
  lastPatients: ILastPatients[] = []

  constructor(
    private appointmentsService: AppointmentsService,
    private paymentsService: PaymentsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getLastPatients()
    this.getLastPayments()
  }

  getLastPatients() {
    this.appointmentsService.getLastPatients().subscribe((patients) => {
      this.lastPatients = patients
    })
  }

  getLastPayments() {
    this.paymentsService.getLastPayments().subscribe((payments) => {
      this.lastPayments = payments
    })
  }
}
