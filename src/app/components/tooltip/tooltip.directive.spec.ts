import { render, screen } from '@testing-library/angular'

import { TooltipModule } from './tooltip.module'
import userEvent from '@testing-library/user-event'

describe('TooltipDirective', () => {
  it('should create a tooltip default and it must be right', async () => {
    await render(
      `
        <div data-testid="tooltip" ariaLabel="tooltip right" hcTooltip="tooltip" appendTo="target">Right</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.getByText('tooltip')).toBeInTheDocument()
    expect(screen.getByLabelText('tooltip right')).toHaveClass('hc-tooltip-right')
  })

  it('should create a tooltip and use position top', async () => {
    await render(
      `
        <div data-testid="tooltip" ariaLabel="tooltip" hcTooltip="tooltip" appendTo="target" tooltipPosition="top">Top</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.getByText('tooltip')).toBeInTheDocument()
    expect(screen.getByLabelText('tooltip')).toHaveClass('hc-tooltip-top')
  })

  it('should create a tooltip and use position left', async () => {
    await render(
      `
        <div data-testid="tooltip" ariaLabel="tooltip" hcTooltip="tooltip" appendTo="target" tooltipPosition="left">Left</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.getByText('tooltip')).toBeInTheDocument()
    expect(screen.getByLabelText('tooltip')).toHaveClass('hc-tooltip-left')
  })

  it('should create a tooltip and use position bottom', async () => {
    await render(
      `
        <div data-testid="tooltip" ariaLabel="tooltip" hcTooltip="tooltip" appendTo="target" tooltipPosition="bottom">Bottom</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.getByText('tooltip')).toBeInTheDocument()
    expect(screen.getByLabelText('tooltip')).toHaveClass('hc-tooltip-bottom')
  })

  it('should create open a tooltip with mousehover and closed with mouseleave', async () => {
    await render(
      `
        <div data-testid="tooltip" ariaLabel="tooltip" hcTooltip="tooltip" appendTo="target">This is a test</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.getByText('tooltip')).toBeInTheDocument()

    await userEvent.unhover(screen.getByTestId('tooltip'))

    expect(screen.queryByText('tooltip')).not.toBeInTheDocument()
  })

  it('create a tooltip with focus and blur', async () => {
    await render(
      `
        <div data-testid="element-blur">
          <input
            type="text"
            hcTooltip="Enter your username"
            tooltipPosition="top"
            tooltipEvent="focus"
            data-testid="input"
          />
        </div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.click(screen.getByTestId('input'))

    expect(screen.getByText('Enter your username')).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('element-blur'))

    expect(screen.queryByText('Enter your username')).not.toBeInTheDocument()
  })

  it('create a tooltip disabled', async () => {
    await render(
      `
        <div data-testid="tooltip" [tooltipDisabled]="true" hcTooltip="tooltip" appendTo="target">This is a test</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.queryByText('tooltip')).not.toBeInTheDocument()
  })

  it('create a tooltip with escape', async () => {
    await render(
      `
        <div data-testid="tooltip" hcTooltip="tooltip <br /> with escape" [escape]="true" appendTo="target">This is a test</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.queryByText('tooltip with escape')).not.toBeInTheDocument()
  })

  it('create a tooltip and click to closed', async () => {
    await render(
      `
        <div data-testid="tooltip" hcTooltip="tooltip" appendTo="target">This is a test</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.queryByText('tooltip')).toBeInTheDocument()

    await userEvent.click(screen.getByText(/this is a test/i))

    expect(screen.queryByText('tooltip')).not.toBeInTheDocument()
  })

  it('create a tooltip without arrow', async () => {
    await render(
      `
        <div data-testid="tooltip" [showTooltipArrow]="false" hcTooltip="tooltip" appendTo="target">This is a test</div>
       `,
      {
        imports: [TooltipModule],
      }
    )

    await userEvent.hover(screen.getByTestId('tooltip'))

    expect(screen.queryByLabelText('tooltip-arrow')).not.toBeInTheDocument()
  })
})
