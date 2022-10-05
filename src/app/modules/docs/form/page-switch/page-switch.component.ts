import { Component } from '@angular/core'
import { ISwitchOnChangeEvent } from './../../../../components/switch/switch.component'

@Component({
  selector: 'app-page-switch',
  template: `
    <div class="hc-docs-title">
      <h2>Switch</h2>
      <p class="body1">Switch é usado para selecionar um valor boolean</p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <h5>Basic</h5>
        <hc-switch
          [label]="label"
          [(ngModel)]="checked"
          (onChange)="change($event)"
        ></hc-switch>
      </hc-card>
    </div>
  `,
  styles: [],
})
export class PageSwitchComponent {
  checked = true
  label = 'On'

  change(event: ISwitchOnChangeEvent) {
    console.log(event)
    if (event.checked) {
      this.label = 'On'
    } else {
      this.label = 'Off'
    }
  }
}
