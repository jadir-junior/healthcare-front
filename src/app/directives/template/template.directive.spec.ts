import { render, screen } from '@testing-library/angular'

import { Component } from '@angular/core'
import { TableBaseService } from 'src/app/components/table/table-base.service'
import { TableModule } from 'src/app/components/table/table.module'
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
      imports: [TableModule, TemplateModule],
      providers: [TableBaseService],
    })

    expect(screen.getByTestId('template-header')).toBeInTheDocument()
  })
})
