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
      <h5 style="margin-bottom: 1.5rem;">Append To</h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="Right" appendTo="target">AppendTo</div>
      </div>
      <h5 style="margin-bottom: 1.5rem;">Hide Delay 3000ms</h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="Right" appendTo="target" [hideDelay]="3000">Hide Delay</div>
      </div>
      <h5 style="margin-bottom: 1.5rem;">Show Delay 1000ms</h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="Right" appendTo="target" [showDelay]="1000">Hide Delay</div>
      </div>
      <h5 style="margin-bottom: 1.5rem;">
        Life - Time to wait in milliseconds to hide the tooltip even it is active.
      </h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="Right" appendTo="target" [life]="2000">Life</div>
      </div>
      <h5 style="margin-bottom: 1.5rem;">
        Escape - By default the tooltip contents are rendered as text. Set to false to
        support html tags in the content.
      </h5>
      <div style="display: flex; gap: 40px; margin-bottom: 1.5rem;">
        <div hcTooltip="this is a <br/> escape" appendTo="target" [escape]="false">
          escape
        </div>
      </div>
    </hc-card>
  `,
  styles: [],
})
export class PageTooltipComponent {}
