import { Component, Input } from '@angular/core'

export interface IBreadcrumbItem {
  label: string
  routerLink: string
}

@Component({
  selector: 'hc-breadcrumb',
  template: `
    <div class="hc-breadcrumb">
      <ul>
        <ng-template ngFor let-item let-end="last" [ngForOf]="model">
          <li>
            <a [routerLink]="item.routerLink" class="hc-breadcrumb-link">
              <span class="hc-breadcrumb-text">{{ item.label }}</span>
            </a>
          </li>
          <li class="material-symbols-outlined" *ngIf="!end">chevron_right</li>
        </ng-template>
      </ul>
    </div>
  `,
  styleUrls: ['breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() model?: IBreadcrumbItem[] | null
}
