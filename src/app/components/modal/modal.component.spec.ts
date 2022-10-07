import { render, screen } from '@testing-library/angular'

import { ButtonModule } from 'src/app/components/button/button.module'
import { ModalComponent } from './modal.component'
import { ModalModule } from './modal.module'
import { TemplateModule } from 'src/app/directives/template/template.module'
import userEvent from '@testing-library/user-event'

describe('ModalComponent', () => {
  it('create a modal component', async () => {
    const { container } = await render(ModalComponent)
    expect(container).toBeInTheDocument()
  })

  it('show the modal', async () => {
    await render(
      `<div>
      <hc-button (click)="display=true">Show</hc-button>
      <hc-modal id="modal-test" header="title" [(visible)]="display" [modal]="true">
        content of modal
        <ng-template hcTemplate="footer">
          <hc-button (click)="display=false">Ok</hc-button>
        </ng-template>
      </hc-modal>
    </div>`,
      {
        imports: [ButtonModule, ModalModule, TemplateModule],
        componentProperties: {
          display: false,
        },
      }
    )

    expect(screen.queryByRole('modal')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /show/i }))

    expect(screen.getByRole('modal')).toBeInTheDocument()
    expect(screen.getByText(/title/i)).toBeInTheDocument()
    expect(screen.getByText(/content of modal/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument()
  })

  it('close the modal', async () => {
    await render(
      `<div>
      <hc-button (click)="display=true">Show</hc-button>
      <hc-modal id="modal-test" header="title" [(visible)]="display" [modal]="true">
        content of modal
        <ng-template hcTemplate="footer">
          <hc-button (click)="display=false">Ok</hc-button>
        </ng-template>
      </hc-modal>
    </div>`,
      {
        imports: [ButtonModule, ModalModule, TemplateModule],
        componentProperties: {
          display: false,
        },
      }
    )

    await userEvent.click(screen.getByRole('button', { name: /show/i }))
    await userEvent.click(screen.getByLabelText(/close/i))

    expect(screen.queryByRole('modal')).not.toBeInTheDocument()
  })
})
