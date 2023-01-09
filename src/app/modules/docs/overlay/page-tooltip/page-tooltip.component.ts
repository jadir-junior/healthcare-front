import { Component } from '@angular/core'

@Component({
  selector: 'app-page-tooltip',
  template: `
    <div class="hc-docs-title">
      <h2>Tooltip</h2>
      <p class="body1">
        Tooltip directive provides advisory information for a component.
      </p>
    </div>
    <hc-card>
      <h5 style="margin-bottom: 1.5rem;">Positions</h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem">
        <div hcTooltip="Right">Right</div>
        <div hcTooltip="Top" tooltipPosition="top">Top</div>
        <div hcTooltip="Left" tooltipPosition="left">Left</div>
        <div hcTooltip="Bottom" tooltipPosition="bottom">Bottom</div>
      </div>
      <h5 style="margin-bottom: 1.5rem;">Focus and Blur</h5>
      <div style="margin-bottom: 1.5rem;">
        <input
          type="text"
          hcTooltip="Enter your username"
          tooltipPosition="top"
          tooltipEvent="focus"
        />
      </div>
      <h5 style="margin-bottom: 1.5rem;">Disabled</h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="Right" [tooltipDisabled]="true">Tooltip disabled</div>
      </div>
    </hc-card>
  `,
  styles: [],
})
export class PageTooltipComponent {}
