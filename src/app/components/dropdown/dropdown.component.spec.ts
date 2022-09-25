import { DropdownModule } from './dropdown.module'
import { render, screen, waitFor } from '@testing-library/angular'
import { Component } from '@angular/core'
import userEvent from '@testing-library/user-event'

@Component({
  selector: 'hc-host-dropdown',
  template: `
    <div aria-label="container">
      <button type="button" (click)="dropdown.toggle($event)">button</button>
      <hc-dropdown #dropdown>
        <div>Dropdown Content</div>
      </hc-dropdown>
    </div>
  `,
})
class HostDropdownComponent {}

@Component({
  selector: 'hc-host-dropdown-dismissable',
  template: `
    <div aria-label="container">
      <button type="button" (click)="dropdown.toggle($event)">button</button>
      <hc-dropdown #dropdown [dismissable]="false">
        <div>Dropdown Content</div>
      </hc-dropdown>
    </div>
  `,
})
class HostDropdownDismissableComponent {}

@Component({
  selector: 'hc-host-dropdown-actual-target',
  template: `
    <div aria-label="container">
      <button type="button" (click)="dropdown.toggle($event, actualTarget)">
        button
      </button>
      <hc-dropdown #dropdown>
        <div>Dropdown Content</div>
      </hc-dropdown>
      <div #actualTarget></div>
    </div>
  `,
})
class HostDropdownActualTargetComponent {}

describe('DropdownComponent', () => {
  const imports = [DropdownModule]

  const setup = async () => {
    return render(HostDropdownComponent, {
      imports: [...imports],
    })
  }

  const setupDismissable = async () => {
    return render(HostDropdownDismissableComponent, {
      imports: [...imports],
    })
  }

  const setupActualTarget = async () => {
    return render(HostDropdownActualTargetComponent, {
      imports: [...imports],
    })
  }

  it('should create a dropdown component', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
    expect(screen.queryByText(/dropdown content/i)).not.toBeInTheDocument()
  })

  it('open dropdown', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /button/i }))

    expect(screen.getByText(/dropdown content/i)).toBeInTheDocument()
  })

  it('close dropdown', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /button/i }))

    await waitFor(() => {
      expect(screen.getByText(/dropdown content/i)).toBeInTheDocument()
    })

    await userEvent.click(screen.getByRole('button', { name: /button/i }))

    await waitFor(() => {
      expect(screen.queryByText(/dropdown content/i)).not.toBeInTheDocument()
    })
  })

  it('close dropdown when click in overlay', async () => {
    await setup()

    await userEvent.click(screen.getByRole('button', { name: /button/i }))
    await userEvent.click(screen.getByLabelText(/container/i))

    await waitFor(() => {
      expect(screen.queryByText(/dropdown content/i)).not.toBeInTheDocument()
    })
  })

  it(`open dropdown and when click outside overlay don't close dropdown`, async () => {
    await setupDismissable()

    await userEvent.click(screen.getByRole('button', { name: /button/i }))
    await userEvent.click(screen.getByLabelText(/container/i))

    await waitFor(() => {
      expect(screen.getByText(/dropdown content/i)).toBeInTheDocument()
    })
  })

  it('close dropdown when click in overlay in actual target', async () => {
    await setupActualTarget()

    await userEvent.click(screen.getByRole('button', { name: /button/i }))
    await userEvent.click(screen.getByLabelText(/container/i))

    await waitFor(() => {
      expect(screen.queryByText(/dropdown content/i)).not.toBeInTheDocument()
    })
  })
})
