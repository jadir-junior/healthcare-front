import { ActivatedRoute, Router } from '@angular/router'

import { Component } from '@angular/core'

@Component({
  selector: 'app-docs',
  template: `
    <div class="wrapper-layout">
      <aside>
        <div style="font-weight: bold">Form</div>
        <div>
          <a (click)="goToRoute('form/inputtext')">Input Text</a>
        </div>

        <div style="font-weight: bold">Table</div>
        <div>
          <a (click)="goToRoute('table/basic')">Basic</a>
        </div>
        <div>
          <a (click)="goToRoute('table/dynamic')">Dynamic</a>
        </div>
        <div>
          <a (click)="goToRoute('table/gridlines')">Gridlines</a>
        </div>
        <div>
          <a (click)="goToRouteRelativePath('/docs/table/page?page=1&limit=5')">Page</a>
        </div>
        <div>
          <a (click)="goToRoute('table/sort')">Sort</a>
        </div>
        <div>
          <a (click)="goToRouteRelativePath('/docs/table/selection?page=1&limit=5')">
            Selection
          </a>
        </div>
        <div>
          <a (click)="goToRouteRelativePath('/docs/table/selectall?page=1&limit=5')">
            Select all
          </a>
        </div>

        <div style="font-weight: bold">Data</div>
        <div>
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

      a {
        cursor: pointer;
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
