import { render, screen } from '@testing-library/angular'

import { TabModule } from './tab.module'
import { TabsComponent } from './tabs.component'
import userEvent from '@testing-library/user-event'

describe('TabComponent', () => {
  it('create tabs container', async () => {
    const { container } = await render(TabsComponent)
    expect(container).toBeInTheDocument()
  })

  it('create a tabs container and tabs panels', async () => {
    await render(
      `
      <hc-tabs>
        <hc-tab-panel header="App Notifications">Content 1</hc-tab-panel>
        <hc-tab-panel header="Feeds">Content 2</hc-tab-panel>
      </hc-tabs>
    `,
      {
        imports: [TabModule],
      }
    )

    expect(screen.getByRole('tab', { name: /app notifications/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /feeds/i })).toBeInTheDocument()
    expect(screen.getByText(/content 1/i)).toHaveAttribute('aria-hidden', 'false')
    expect(screen.getByText(/content 2/i)).toHaveAttribute('aria-hidden', 'true')
  })

  it('change the tab to feeds', async () => {
    await render(
      `
      <hc-tabs>
        <hc-tab-panel header="App Notifications">Content 1</hc-tab-panel>
        <hc-tab-panel header="Feeds">Content 2</hc-tab-panel>
      </hc-tabs>
    `,
      {
        imports: [TabModule],
      }
    )

    await userEvent.click(screen.getByRole('tab', { name: /feeds/i }))

    expect(screen.getByText(/content 1/i)).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText(/content 2/i)).toHaveAttribute('aria-hidden', 'false')
  })
})
