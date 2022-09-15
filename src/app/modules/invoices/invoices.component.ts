/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { CurrencyPipe, DatePipe } from '@angular/common'

interface IInvoice {
  company: string
  date: string | null
  recipient: string
  status: string
  amount: string | null
}

const RESPONSE = [
  {
    company: 'Sterling Cooper Ltd.',
    date: new Date().toISOString(),
    recipient: 'Leslie Alexander',
    status: 'PAID',
    amount: 293.01,
  },
  {
    company: 'Acme Co.',
    date: new Date().toISOString(),
    recipient: 'Ronald Richards',
    status: 'SCHEDULED',
    amount: 596.28,
  },
  {
    company: 'Sirius Cybernetics Co.',
    date: new Date().toISOString(),
    recipient: 'Jane Cooper',
    status: 'UNPAID',
    amount: 219.78,
  },
]

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  hcDtOptions!: any
  invoices: IInvoice[] = []

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    this.invoices = RESPONSE.map((row) => ({
      company: row.company,
      date: this.datePipe.transform(row.date, 'dd/MM/yyyy'),
      recipient: row.recipient,
      status: row.status,
      amount: this.currencyPipe.transform(row.amount, 'BRL'),
    }))

    this.hcDtOptions = {
      columns: [
        {
          title: 'Company',
          data: 'company',
        },
        {
          title: 'Date',
          data: 'date',
          textColor: '#A0A4A8',
        },
        {
          title: 'Recipient',
          data: 'recipient',
        },
        {
          title: 'Status',
          data: 'status',
        },
        {
          title: 'Amount',
          data: 'amount',
        },
      ],
    }
  }
}
