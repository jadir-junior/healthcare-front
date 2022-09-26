import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core'

import { IStyle } from './../../common/models/style.model'
import { TemplateDirective } from './../../directives/template/template.directive'

@Component({
  selector: 'hc-toolbar',
  template: `
    <div class="hc-toolbar" role="toolbar" [ngStyle]="style">
      <ng-content></ng-content>
      <div class="hc-toolbar-group-left" *ngIf="leftTemplate">
        <ng-container *ngTemplateOutlet="leftTemplate"></ng-container>
      </div>
      <div class="hc-toolbar-group-right" *ngIf="rightTemplate">
        <ng-container *ngTemplateOutlet="rightTemplate"></ng-container>
      </div>
    </div>
  `,
  styles: [
    `
      .hc-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: var(--neutral-white);
        padding: 0.5rem;
      }

      .hc-toolbar-group-left,
      .hc-toolbar-group-right {
        display: flex;
        aling-item: center;
      }
    `,
  ],
})
export class ToolbarComponent implements AfterContentInit {
  leftTemplate!: TemplateRef<TemplateDirective>
  rightTemplate!: TemplateRef<TemplateDirective>

  @Input() style?: IStyle

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'left':
          this.leftTemplate = item.template
          break

        case 'right':
          this.rightTemplate = item.template
          break
      }
    })
  }
}
