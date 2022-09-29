import { AfterContentInit, Component, Input } from '@angular/core'

@Component({
  selector: 'hc-profile-background',
  template: `
    <div
      class="hc-profile-background"
      style="background-image: url()"
      [ngStyle]="style"
    ></div>
  `,
  styles: [
    `
      .hc-profile-background {
        width: 100%;
        height: 240px;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        background-size: cover;
      }
    `,
  ],
})
export class ProfileBackgroundComponent implements AfterContentInit {
  style!: { [key: string]: string }
  @Input() image!: string

  ngAfterContentInit(): void {
    this.style = { backgroundImage: `url(${this.image})` }
  }
}
