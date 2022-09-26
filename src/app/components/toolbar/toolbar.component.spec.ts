import { render, screen } from '@testing-library/angular'

import { TemplateModule } from './../../directives/template/template.module'
import { ToolbarComponent } from './toolbar.component'

describe('ToolbarComponent', () => {
  it('create a toolbar', async () => {
    const { container } = await render(ToolbarComponent)

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('toolbar')).toHaveClass('hc-toolbar')
  })

  it('create a toolbar with ng-content', async () => {
    await render(`<hc-toolbar>Tool Bar Content</hc-toolbar>`, {
      declarations: [ToolbarComponent],
    })

    expect(screen.getByText(/tool bar content/i)).toBeInTheDocument()
  })

  it('create a toolbar with left template', async () => {
    await render(
      `<hc-toolbar><ng-template hcTemplate="left">Left Template</ng-template></hc-toolbar>`,
      {
        declarations: [ToolbarComponent],
        imports: [TemplateModule],
      }
    )

    expect(screen.getByText(/left template/i)).toBeInTheDocument()
  })

  it('create a toolbar with right template', async () => {
    await render(
      `<hc-toolbar><ng-template hcTemplate="right">Right Template</ng-template></hc-toolbar>`,
      {
        declarations: [ToolbarComponent],
        imports: [TemplateModule],
      }
    )

    expect(screen.getByText(/right template/i)).toBeInTheDocument()
  })

  it('create a toolbar with left and right template', async () => {
    await render(
      `<hc-toolbar>
        <ng-template hcTemplate="left">Left Template</ng-template>
        <ng-template hcTemplate="right">Right Template</ng-template>
      </hc-toolbar>`,
      {
        declarations: [ToolbarComponent],
        imports: [TemplateModule],
      }
    )

    expect(screen.getByText(/right template/i)).toBeInTheDocument()
    expect(screen.getByText(/left template/i)).toBeInTheDocument()
  })

  it('create a toolbar with another style', async () => {
    await render(ToolbarComponent, {
      declarations: [ToolbarComponent],
      componentProperties: {
        style: {
          'background-color': '#ccc',
        },
      },
    })

    expect(screen.getByRole('toolbar')).toHaveStyle('background-color: #ccc')
  })
})
