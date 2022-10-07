import { Component } from '@angular/core'

@Component({
  selector: 'app-page-modal',
  template: `
    <hc-card>
      <hc-modal
        header="Title"
        [(visible)]="display"
        [modal]="true"
        [style]="{ width: '500px' }"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
        <ng-template hcTemplate="footer">
          <hc-button (click)="close()" color="primary">Ok</hc-button>
        </ng-template>
      </hc-modal>
      <hc-button color="primary" (onClick)="show()">Show</hc-button>
    </hc-card>
  `,
  styles: [],
})
export class PageModalComponent {
  display = true

  show() {
    this.display = true
  }

  close() {
    this.display = false
  }
}
