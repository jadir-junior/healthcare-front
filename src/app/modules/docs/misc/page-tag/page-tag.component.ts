import { Component } from '@angular/core'

@Component({
  selector: 'app-page-tag',
  template: `
    <hc-card>
      <div style="margin-bottom: 1.5rem;">
        <h5 style="margin-bottom: 1rem;">Tags</h5>
        <div class="hc-tag-wrapper">
          <div>
            <hc-tag severity="primary">Primary</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="success">Success</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="info">Info</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="warning">Warning</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="danger">Danger</hc-tag>
          </div>
        </div>
      </div>
      <div style="margin-bottom: 1.5rem;">
        <h5 style="margin-bottom: 1rem;">Pills</h5>
        <div class="hc-tag-wrapper">
          <div>
            <hc-tag severity="primary" [rounded]="true">Primary</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="success" [rounded]="true">Success</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="info" [rounded]="true">Info</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="warning" [rounded]="true">Warning</hc-tag>
          </div>
          <div style="margin-left: 1rem;">
            <hc-tag severity="danger" [rounded]="true">Danger</hc-tag>
          </div>
        </div>
      </div>
    </hc-card>
  `,
  styles: [
    `
      .hc-tag-wrapper {
        display: flex;
      }
    `,
  ],
})
export class PageTagComponent {}
