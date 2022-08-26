import { Component } from '@angular/core'

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="container">
      <div class="wrapper-form wrapper-section-page-not-found">
        <h1 class="title" style="margin-bottom: 16px">404</h1>
        <p class="body1 description" style="margin-bottom: 48px">
          Oops. The page you were looking for doesn't exist.
        </p>
        <div>
          <hc-button
            routerLink="/"
            type="button"
            color="primary"
            ariaLabel="back to home"
          >
            Back to home
          </hc-button>
        </div>
      </div>
      <div class="background-404"></div>
    </div>
  `,
  styleUrls: ['../scss/authentication.scss'],
})
export class PageNotFoundComponent {}
