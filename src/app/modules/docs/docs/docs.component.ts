import { ActivatedRoute, Router } from '@angular/router'

import { Component } from '@angular/core'

@Component({
  selector: 'app-docs',
  template: `
    <div class="wrapper-layout">
      <aside>
        <div>Table</div>
        <a (click)="goToRoute('table/basic')">Basic</a>
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
    `,
  ],
})
export class DocsComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToRoute(route: string): void {
    this.router.navigate([route], { relativeTo: this.route })
  }
}
