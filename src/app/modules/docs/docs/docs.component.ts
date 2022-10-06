import { ActivatedRoute, Router } from '@angular/router'

import { Component } from '@angular/core'
import { IMenuItem } from 'src/app/components/menu/menu-item.component'

@Component({
  selector: 'app-docs',
  template: `
    <div class="wrapper-layout">
      <hc-sidebar>
        <hc-logo
          [style]="{ margin: '1.5rem', cursor: 'pointer' }"
          routerLink="/home"
        ></hc-logo>
        <hc-menu [model]="menu" [style]="{ margin: '0.25rem 1.5rem' }"></hc-menu>
      </hc-sidebar>
      <main style="margin: 4rem 4rem;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .wrapper-layout {
        display: grid;
        grid-template-columns: 256px calc(100% - 256px);
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
  menu: IMenuItem[] = [
    {
      label: 'Form',
      items: [
        { label: 'Input Text', routerLink: '/docs/form/inputtext' },
        { label: 'Checkbox', routerLink: '/docs/form/checkbox' },
        { label: 'Switch', routerLink: '/docs/form/switch' },
        { label: 'Select', routerLink: '/docs/form/select' },
      ],
    },
    {
      label: 'Table',
      items: [
        { label: 'Basic', routerLink: '/docs/table/basic' },
        {
          label: 'Dynamic',
          routerLink: '/docs/table/dynamic',
        },
        {
          label: 'Gridlines',
          routerLink: '/docs/table/gridlines',
        },
        {
          label: 'Page',
          routerLink: '/docs/table/page',
          queryParams: { page: 1, limit: 5 },
          routerLinkActiveOptions: {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            paths: 'exact',
            fragment: 'ignored',
          },
        },
        {
          label: 'Sort',
          routerLink: '/docs/table/sort',
          queryParams: { sortColumn: 'code', sortDirection: 'ASC' },
          routerLinkActiveOptions: {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            paths: 'exact',
            fragment: 'ignored',
          },
        },
        {
          label: 'Selection',
          routerLink: '/docs/table/selection',
          queryParams: { page: 1, limit: 5 },
          routerLinkActiveOptions: {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            paths: 'exact',
            fragment: 'ignored',
          },
        },
        {
          label: 'Limit',
          routerLink: '/docs/table/limit',
          queryParams: { page: 1, limit: 5 },
          routerLinkActiveOptions: {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            paths: 'exact',
            fragment: 'ignored',
          },
        },
        {
          label: 'Select all',
          routerLink: '/docs/table/selectall',
          queryParams: { page: 1, limit: 5 },
          routerLinkActiveOptions: {
            matrixParams: 'ignored',
            queryParams: 'ignored',
            paths: 'exact',
            fragment: 'ignored',
          },
        },
        {
          label: 'Scroll',
          routerLink: '/docs/table/scroll',
        },
        {
          label: 'Row Expand',
          routerLink: '/docs/table/rowexpand',
        },
        { label: 'Toggle', routerLink: '/docs/table/toggle' },
      ],
    },
    {
      label: 'Data',
      items: [
        {
          label: 'Pagination',
          routerLink: '/docs/data/pagination',
        },
        {
          label: 'Timeline',
          routerLink: '/docs/data/timeline',
        },
      ],
    },
    {
      label: 'Misc',
      items: [
        {
          label: 'Tag',
          routerLink: '/docs/misc/tag',
        },
      ],
    },
  ]

  constructor(private router: Router, private route: ActivatedRoute) {}

  goToRoute(route: string): void {
    this.router.navigate([route], { relativeTo: this.route })
  }

  goToRouteRelativePath(route: string): void {
    this.router.navigateByUrl(route)
  }
}
