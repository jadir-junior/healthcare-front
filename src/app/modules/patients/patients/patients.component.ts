import { Component, OnInit } from '@angular/core'
import { IPatient, PatientsService } from '../patients.service'

import { ActivatedRoute } from '@angular/router'
import { IHcDtOptions } from 'src/app/components/table/table.component'
import { IPagination } from 'src/app/models/pagination.model'
import { TableBaseService } from 'src/app/components/table/table-base.service'

@Component({
  selector: 'app-patients',
  template: `<hc-table
    *ngIf="patients.length"
    [items]="patients"
    [hcDtOptions]="DtOptions"
    (sortColumnEvent)="tableBaseService.sort($event)"
  ></hc-table>`,
  providers: [TableBaseService],
})
export class PatientsComponent implements OnInit {
  patients: IPatient[] = []

  DtOptions: IHcDtOptions = {
    columns: [
      {
        title: 'Name',
        data: 'name',
      },
      {
        title: 'Email',
        data: 'email',
      },
      {
        title: 'Age',
        data: 'age',
      },
      {
        title: 'Adress',
        data: 'address',
      },
      {
        title: 'Phone',
        data: 'phone',
      },
      {
        title: 'Status',
        data: 'status',
      },
    ],
  }

  constructor(
    private route: ActivatedRoute,
    private patientsService: PatientsService,
    public tableBaseService: TableBaseService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => {
      this.getPatients()
    })
  }

  getPatients(): void {
    this.patientsService
      .findAll(
        this.tableBaseService.page,
        this.tableBaseService.limit,
        this.tableBaseService.sortDirection,
        this.tableBaseService.sortColumn
      )
      .subscribe((response: IPagination<IPatient>) => {
        this.patients = response.items
      })
  }
}
