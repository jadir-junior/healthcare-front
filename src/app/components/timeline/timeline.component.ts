import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core'

import { IStyle } from './../../common/models/style.model'
import { TemplateDirective } from './../../directives/template/template.directive'

@Component({
  selector: 'hc-timeline',
  template: `
    <div [ngClass]="classes" [class]="styleClass">
      <div
        *ngFor="let event of value; let last = last"
        class="hc-timeline-event"
        [style]="style"
      >
        <div [ngClass]="{ 'hc-timeline-event-opposite': opposite }">
          <ng-container
            *ngTemplateOutlet="oppositeTemplate; context: { $implicit: event }"
          ></ng-container>
        </div>
        <div class="hc-timeline-event-separator">
          <ng-container *ngIf="markerTemplate; else marker">
            <ng-container
              *ngTemplateOutlet="markerTemplate; context: { $implicit: event, last }"
            ></ng-container>
          </ng-container>
          <ng-template #marker>
            <div class="hc-timeline-event-marker"></div>
          </ng-template>
          <ng-container *ngIf="connectorTemplate; else connector">
            <ng-container
              *ngTemplateOutlet="connectorTemplate; context: { $implicit: event, last }"
            ></ng-container>
          </ng-container>
          <ng-template #connector>
            <div *ngIf="!last" class="hc-timeline-event-connector"></div>
          </ng-template>
        </div>
        <div class="hc-timeline-event-content">
          <ng-container
            *ngTemplateOutlet="contentTemplate; context: { $implicit: event }"
          ></ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent<T> implements AfterContentInit {
  @Input() align = 'left'
  @Input() value: T[] = []
  @Input() layout: 'vertical' | 'horizontal' = 'vertical'
  @Input() style?: IStyle
  @Input() styleClass!: string
  @Input() opposite = true

  contentTemplate!: TemplateRef<TemplateDirective>
  markerTemplate?: TemplateRef<TemplateDirective>
  connectorTemplate?: TemplateRef<TemplateDirective>
  oppositeTemplate!: TemplateRef<TemplateDirective>

  @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template
          break
        case 'marker':
          this.markerTemplate = item.template
          break
        case 'connector':
          this.connectorTemplate = item.template
          break
        case 'opposite':
          this.oppositeTemplate = item.template
          break
      }
    })
  }

  get classes() {
    return {
      'hc-timeline': true,
      'hc-timeline-vertical': this.layout === 'vertical',
      'hc-timeline-horizontal': this.layout === 'horizontal',
      'hc-timeline-left': this.align === 'left',
    }
  }
}
