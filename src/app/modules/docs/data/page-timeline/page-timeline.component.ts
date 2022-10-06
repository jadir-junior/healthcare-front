import { Component, ViewEncapsulation } from '@angular/core'

import { isEmpty } from 'lodash'

@Component({
  selector: 'app-page-timeline',
  template: `
    <div class="hc-docs-title">
      <h2>Timeline</h2>
      <p class="body1">Timeline é a visualização de uma cadeia de eventos</p>
    </div>
    <div class="hc-docs-components">
      <hc-card>
        <h5 style="margin-bottom: 1rem;">Horizontal</h5>
        <hc-timeline [value]="eventsYears" layout="horizontal">
          <ng-template hcTemplate="content" let-event>{{ event }}</ng-template>
        </hc-timeline>

        <h5 style="margin: 1rem 0">Customizado</h5>
        <div class="hc-wrapper-timeline">
          <hc-timeline
            styleClass="hc-custom-timeline-event"
            [value]="eventsCustomized"
            layout="horizontal"
          >
            <ng-template hcTemplate="opposite" let-event>
              <div class="hc-custom-opposite" *ngIf="!isEmpty(event)">
                {{ event.status === 'LIGADO' ? 'PEDÁGIO LIGADO' : 'PEDÁGIO DESLIGADO' }}
              </div>
            </ng-template>
            <ng-template hcTemplate="marker" let-event let-last="last">
              <span
                *ngIf="!last"
                class="hc-custom-marker"
                [style.backgroundColor]="event.color"
              >
                <hc-icon [icon]="event.icon" [style]="{ color: 'white' }"></hc-icon>
              </span>
              <div *ngIf="last" class="hc-custom-marker-last"></div>
            </ng-template>
            <ng-template hcTemplate="connector" let-event let-last="last">
              <div
                *ngIf="!last"
                class="hc-timeline-event-connector"
                [ngStyle]="{
                  'background-color':
                    event.status === 'LIGADO' ? 'var(--primary-default)' : '#c8c8c8'
                }"
              ></div>
            </ng-template>
            <ng-template hcTemplate="content" let-event>
              <div class="hc-custom-content" *ngIf="event.description">
                <div>{{ event.user }}</div>
                <div>
                  {{ event.dateInitial | date: 'dd/MM/yyyy' }} até
                  {{ event.dateEnd | date: 'dd/MM/yyyy' }}
                </div>
                <div style="margin-top: 1rem;">
                  <span class="hc-custom-content-description">Motivo:</span>
                  {{ event.description }}
                </div>
              </div>
            </ng-template>
          </hc-timeline>
        </div>
      </hc-card>
    </div>
  `,
  styleUrls: ['page-timeline.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageTimelineComponent {
  isEmpty = isEmpty

  eventsYears = [2020, 2021, 2022, 2023, '']
  eventsCustomized = [
    {
      status: 'DESLIGADO',
      dateInitial: new Date(),
      dateEnd: new Date(),
      user: 'Mileide Daiane E. Ribeiro',
      description:
        'Preencher com um motivo de no máximo 80 caracteres pra ter noção de espaçamento',
      icon: 'power_settings_new',
      color: '#c8c8c8',
    },
    {
      status: 'LIGADO',
      dateInitial: new Date(),
      dateEnd: new Date(),
      user: 'Mileide Daiane E. Ribeiro',
      description:
        'Preencher com um motivo de no máximo 80 caracteres pra ter noção de espaçamento',
      icon: 'power_settings_new',
      color: 'var(--primary-default)',
    },
    {
      status: 'LIGADO',
      dateInitial: new Date(),
      dateEnd: new Date(),
      user: 'Mileide Daiane E. Ribeiro',
      description:
        'Preencher com um motivo de no máximo 80 caracteres pra ter noção de espaçamento',
      icon: 'power_settings_new',
      color: 'var(--primary-default)',
    },
    {
      status: 'LIGADO',
      dateInitial: new Date(),
      dateEnd: new Date(),
      user: 'Mileide Daiane E. Ribeiro',
      description:
        'Preencher com um motivo de no máximo 80 caracteres pra ter noção de espaçamento',
      icon: 'power_settings_new',
      color: 'var(--primary-default)',
    },
    {
      status: 'LIGADO',
      dateInitial: new Date(),
      dateEnd: new Date(),
      user: 'Mileide Daiane E. Ribeiro',
      description:
        'Preencher com um motivo de no máximo 80 caracteres pra ter noção de espaçamento',
      icon: 'power_settings_new',
      color: 'var(--primary-default)',
    },
    {},
  ]
}
