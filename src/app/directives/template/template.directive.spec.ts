import { render, screen } from '@testing-library/angular'

import { Component } from '@angular/core'
import { DataService } from '../../components/table/data.service'
import { PaginationDirective } from 'src/app/components/table/pagination.directive'
import { TableModule } from 'src/app/components/table/table.module'
import { TableService } from 'src/app/components/table/table.service'
import { TemplateModule } from './template.module'

@Component({
  template: `
    <hc-table>
      <ng-template hcTemplate="header">
        <div data-testid="template-header"></div>
      </ng-template>
    </hc-table>
  `,
})
export class HostComponent {}

describe('TemplateDirective', () => {
  it('should create wrapper to test template', async () => {
    await render(HostComponent, {
      declarations: [PaginationDirective],
      providers: [TableService, DataService, PaginationDirective],
      imports: [TableModule, TemplateModule],
    })

    expect(screen.getByTestId('template-header')).toBeInTheDocument()
  })
})
