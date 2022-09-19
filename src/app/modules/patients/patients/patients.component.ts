import { Component } from '@angular/core'

@Component({
  selector: 'app-patients',
  template: `
    <!-- <hc-table
      *ngIf="tableBaseService.items.length"
      [checkbox]="true"
      [hcDtOptions]="DtOptions"
      [sort]="true"
      (sortColumnEvent)="tableBaseService.sort($event)"
    ></hc-table> -->
  `,
})
export class PatientsComponent {
  DtOptions = {
    columns: [
      {
        title: 'Name',
        data: 'name',
        sortableColumn: 'name',
      },
      {
        title: 'Email',
        data: 'email',
        sortableColumn: 'email',
      },
      {
        title: 'Age',
        data: 'age',
        sortableColumn: 'age',
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
}
