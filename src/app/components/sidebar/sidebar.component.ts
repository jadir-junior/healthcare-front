import { Component } from '@angular/core'

@Component({
  selector: 'hc-sidebar',
  template: `
    <div #container class="hc-sidebar hc-sidebar-left">
      <div class="hc-sidebar-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .hc-sidebar-content {
        position: relative;
        overflow-y: auto;
      }

      .hc-sidebar {
        position: sticky;
        transition: transform 0.3s;
        display: flex;
        flex-direction: column;
        background-color: var(--neutral-white);
        box-shadow: 4px 0px 16px rgba(16, 30, 115, 0.08);
      }

      .hc-sidebar-left {
        top: 0;
        left: 0;
        width: 256px;
        height: 100vh;
      }
    `,
  ],
})
export class SidebarComponent {}
