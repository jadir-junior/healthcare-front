import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common'

import { InvoicesComponent } from './invoices.component'
import { InvoicesRoutingModule } from './invoices-routing.module'
import { NgModule } from '@angular/core'
import { StatusModule } from 'src/app/components/status/status.module'
import { TableModule } from 'src/app/components/table/table.module'

@NgModule({
  declarations: [InvoicesComponent],
  imports: [CommonModule, InvoicesRoutingModule, TableModule, StatusModule],
  providers: [DatePipe, CurrencyPipe],
})
export class InvoicesModule {}
