import { Meta, Story } from '@storybook/angular'

import { TableComponent } from './table.component'

export default {
  component: TableComponent,
  title: 'Table',
  excludeStories: /.*Data$/,
} as Meta

const Template: Story<TableComponent> = (args: TableComponent) => ({
  props: {
    ...args,
  },
  template: `<hc-table [hcDtOptions]="hcDtOptions"></hc-table>`,
})

export const TableDefault = Template.bind({})
TableDefault.args = {
  hcDtOptions: {
    ajax: [
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
    ],
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
        title: 'Receipient',
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
  },
}
