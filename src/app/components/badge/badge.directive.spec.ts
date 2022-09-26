import { render, screen } from '@testing-library/angular'

import { BadgeModule } from './badge.module'
import { Component } from '@angular/core'

@Component({
  selector: 'hc-host-badge-directive',
  template: ` <div hcBadge value="8" data-testid="host"></div> `,
})
class HostBadgeComponent {}

@Component({
  selector: 'hc-host-badge-value-null-directive',
  template: ` <div hcBadge data-testid="host"></div> `,
})
class HostBadgeValueNullComponent {}

describe('BadgeDirective', () => {
  it('create a badge with directive with value', async () => {
    await render(HostBadgeComponent, {
      imports: [BadgeModule],
    })

    expect(screen.getByRole(/badge/i)).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByRole(/badge/i)).toHaveClass('hc-badge-danger')
  })

  it('create a badge with directive with value null', async () => {
    await render(HostBadgeValueNullComponent, {
      imports: [BadgeModule],
    })

    expect(screen.getByRole(/badge/i)).toHaveClass('hc-badge-dot')
  })
})
