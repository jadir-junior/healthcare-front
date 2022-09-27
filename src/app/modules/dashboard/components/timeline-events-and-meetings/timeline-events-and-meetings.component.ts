import { Component, Input } from '@angular/core'

export interface ITimelineEventsAndMettings {
  status: string
  date: Date
  description: string
  icon: string
  color: string
}

@Component({
  selector: 'hc-timeline-events-and-meetings',
  template: `
    <h5 class="hc-timeline-title">{{ title }}</h5>
    <hc-timeline [value]="timeline">
      <ng-template hcTemplate="marker" let-event>
        <span class="custom-marker" [style.backgroundColor]="event.color">
          <hc-icon
            [icon]="event.icon"
            [style]="{ color: 'var(--neutral-white)' }"
          ></hc-icon>
        </span>
      </ng-template>
      <ng-template hcTemplate="content" let-event>
        <div style="margin-bottom: 2.5rem;">
          <div
            style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; width: 100%;"
          >
            <div class="subtitle1" style="color: var(--neutral-black);">
              {{ event.status }}
            </div>
            <div
              class="small2"
              style="color: var(--neutral-gray); display: flex; align-items: center;"
            >
              {{ event.date | date: 'short' }}
              <hc-icon
                size="small"
                icon="schedule"
                [style]="{ 'margin-left': '0.5rem' }"
              ></hc-icon>
            </div>
          </div>
          <div class="body2" style="color: var(--neutral-gray-dark)">
            {{ event.description }}
          </div>
        </div>
      </ng-template>
    </hc-timeline>
  `,
  styles: [
    `
      .custom-marker {
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        z-index: 1;
      }

      .hc-timeline-title {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class TimelineEventsAndMeetingsComponent {
  @Input() title!: string
  @Input() timeline: ITimelineEventsAndMettings[] = []
}
