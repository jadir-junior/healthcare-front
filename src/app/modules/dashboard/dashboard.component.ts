import { Component } from '@angular/core'

interface IIntroduction {
  title: string
  description: string
}

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <hc-card header="Introduction">
        <div>
          <div
            class="wrapper-introduction-information"
            *ngFor="let information of informationsIntroductions"
          >
            <p class="small2">{{ information.title }}</p>
            <p class="body2">{{ information.description }}</p>
          </div>
        </div>
      </hc-card>
    </div>
  `,
  styles: [
    `
      .container {
        margin: 2rem;
      }

      .wrapper-introduction-information:not(:last-child) {
        margin-bottom: 1rem;
      }

      p.small2 {
        color: var(--neutral-gray);
        margin-bottom: 0.5rem;
      }

      p.body2 {
        color: var(--neutral-black);
      }
    `,
  ],
})
export class DashboardComponent {
  informationsIntroductions: IIntroduction[] = [
    {
      title: 'Address',
      description: '795 Folsom Ave, Suite 600 San Francisco, CADGE 94107',
    },
    {
      title: 'Email',
      description: 'denta@gmail.com',
    },
    {
      title: 'Phone',
      description: '0126596452',
    },
  ]
}
