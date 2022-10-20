import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router'
import { BehaviorSubject, filter } from 'rxjs'

import { IBreadcrumbItem } from './breadcrumb.component'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private readonly _breadcrumbs$ = new BehaviorSubject<IBreadcrumbItem[]>([])

  readonly breadcrumbs$ = this._breadcrumbs$.asObservable()

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root
        const breadcrumbs: IBreadcrumbItem[] = []
        this.addBreadcrumb(root, [], breadcrumbs)

        this._breadcrumbs$.next(breadcrumbs)
      })
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot | null,
    parentUrl: string[],
    breadcrumbs: IBreadcrumbItem[]
  ) {
    if (route) {
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path))

      if (route.data['breadcrumb']) {
        const breadcrumb = {
          label: this.getLabel(route.data),
          routerLink: '/' + routeUrl.join('/'),
        }
        breadcrumbs.push(breadcrumb)
      }

      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs)
    }
  }

  private getLabel(data: Data) {
    return typeof data['breadcrumb'] === 'function'
      ? data['breadcrumb'](data)
      : data['breadcrumb']
  }
}
