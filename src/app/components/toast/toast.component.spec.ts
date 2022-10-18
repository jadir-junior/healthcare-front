import { render, screen } from '@testing-library/angular'

import { Component } from '@angular/core'
import { MessageService } from './message.service'
import { ToastComponent } from './toast.component'
import { ToastItemComponent } from './toast-item.component'
import userEvent from '@testing-library/user-event'

@Component({
  selector: 'app-container-toast',
  template: `
    <div>
      <hc-toast></hc-toast>
      <button type="button" (click)="showToast()">Success</button>
    </div>
  `,
})
class ContainerToastComponent {
  constructor(private messageService: MessageService) {}

  showToast() {
    this.messageService.add({ severity: 'success', detail: 'toast success' })
  }
}

describe('ToastComponent', () => {
  const setup = async () => {
    return render(ContainerToastComponent, {
      declarations: [ToastItemComponent, ToastComponent],
      providers: [MessageService],
    })
  }

  it('create a toaster', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })

  it('show toast success', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /success/i }))

    expect(screen.getByText(/toast success/i)).toBeInTheDocument()
  })

  it('show several toasts success', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /success/i }))
    await userEvent.click(screen.getByRole('button', { name: /success/i }))
    await userEvent.click(screen.getByRole('button', { name: /success/i }))

    expect(screen.getAllByText(/toast success/i).length).toBe(3)
  })
})
