import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core'

import { TemplateDirective } from './../../directives/template/template.directive'

@Component({
  selector: 'hc-timeline',
  template: `
    <div [ngClass]="classes">
      <div *ngFor="let event of value; let last = last" class="hc-timeline-event">
        <div class="hc-timeline-event-separator">
          <ng-container *ngIf="markerTemplate; else marker">
            <ng-container
              *ngTemplateOutlet="markerTemplate; context: { $implicit: event }"
            ></ng-container>
          </ng-container>
          <ng-template #marker>
            <div class="hc-timeline-event-marker"></div>
          </ng-template>
          <div *ngIf="!last" class="hc-timeline-event-connector"></div>
        </div>
        <div class="hc-timeline-event-content">
          <ng-container
            *ngTemplateOutlet="contentTemplate; context: { $implicit: event }"
          ></ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .hc-timeline {
        display: flex;
        flex-grow: 1;
        flex-direction: column;

        &.hc-timeline-vertical {
          .hc-timeline-event-connector {
            width: 2px;
          }
        }

        .hc-timeline-event-connector {
          background-color: var(--neutral-divider);
        }
      }

      .hc-timeline-event {
        display: flex;
        position: relative;
        min-height: 70px;

        &:last-child {
          min-height: 0;
        }
      }

      .hc-timeline-event-separator {
        flex: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
      }

      .hc-timeline-event-marker {
        display: flex;
        align-self: baseline;
      }

      .hc-timeline-event-connector {
        flex-grow: 1;
      }

      .hc-timeline-event-content {
        padding: 0 1rem;
        width: 100%;
      }
    `,
  ],
})
export class TimelineComponent<T> implements AfterContentInit {
  @Input() value: T[] = []

  contentTemplate!: TemplateRef<TemplateDirective>
  markerTemplate?: TemplateRef<TemplateDirective>

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
      }
    })
  }

  get classes() {
    return {
      'hc-timeline': true,
      'hc-timeline-vertical': true,
    }
  }
}
