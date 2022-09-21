import { ActivatedRoute, Router } from '@angular/router'

import { Component } from '@angular/core'

@Component({
  selector: 'app-docs',
  template: `
    <div class="wrapper-layout">
      <aside>
        <div class="menu-category">Form</div>
        <div
          class="menu-item"
          [routerLinkActive]="['menu-item-active']"
          [routerLink]="['/docs/form/inputtext']"
        >
          <a>Input Text</a>
        </div>

        <div class="menu-category">Table</div>
        <div
          class="menu-item"
          [routerLinkActive]="['menu-item-active']"
          [routerLink]="['/docs/table/basic']"
        >
          <a>Basic</a>
        </div>
        <div
          class="menu-item"
          [routerLinkActive]="['menu-item-active']"
          [routerLink]="['/docs/table/dynamic']"
        >
          <a>Dynamic</a>
        </div>
        <div
          class="menu-item"
          [routerLinkActive]="['menu-item-active']"
          [routerLink]="['/docs/table/gridlines']"
        >
          <a>Gridlines</a>
        </div>
        <div
          class="menu-item"
          [routerLink]="['/docs/table/page']"
          [queryParams]="{ page: 1, limit: 5 }"
          [routerLinkActive]="['menu-item-active']"
        >
          <a>Page</a>
        </div>
        <div
          class="menu-item"
          [routerLink]="['/docs/table/selection']"
          [queryParams]="{ sortColumn: 'code', sortDirection: 'ASC' }"
          [routerLinkActive]="['menu-item-active']"
        >
          <a>Sort</a>
        </div>
        <div
          class="menu-item"
          [routerLink]="['/docs/table/selection']"
          [queryParams]="{ page: 1, limit: 5 }"
          [routerLinkActive]="['menu-item-active']"
        >
          <a> Selection </a>
        </div>
        <div
          class="menu-item"
          [routerLink]="['/docs/table/selectall']"
          [queryParams]="{ page: 1, limit: 5 }"
          [routerLinkActive]="['menu-item-active']"
        >
          <a> Select all </a>
        </div>

        <div class="menu-category">Data</div>
        <div
          class="menu-item"
          [routerLinkActive]="['menu-item-active']"
          [routerLink]="['/docs/data/pagination']"
        >
          <a (click)="goToRoute('data/pagination')">Pagination</a>
        </div>
      </aside>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .wrapper-layout {
        display: grid;
        grid-template-columns: 0.4fr 2.6fr;
      }

      aside {
        background-color: white;
        padding: 24px;
      }

      main {
      }

      .menu-category {
        padding: 0.5rem 0.25rem;
        font-weight: 700;
        color: var(--neutral-black);
        font-size: 16px;
      }

      .menu-item {
        color: var(--neutral-black);
        padding: 0.5rem 0.75rem;
        border-radius: 10px;
        cursor: pointer;
      }

      .menu-item-active {
        color: var(--primary-default);
        font-weight: 700;
        background-color: var(--primary-lightest);
      }
    `,
  ],
})
export class DocsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToRoute(route: string): void {
    this.router.navigate([route], { relativeTo: this.route })
  }

  goToRouteRelativePath(route: string): void {
    this.router.navigateByUrl(route)
  }
}
