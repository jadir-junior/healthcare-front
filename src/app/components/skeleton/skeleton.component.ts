import { Component, Input, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'hc-skeleton',
  template: ` <div [ngClass]="classes" [ngStyle]="styles"></div> `,
  styles: [
    `
      .hc-skeleton {
        background-color: var(--neutral-divider);
        border-radius: 0.5rem;
        position: relative;
        overflow: hidden;

        &:after {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0)
          );
          content: '';
          animation: hc-skeleton-animation 1.2s infinite;
          height: 100%;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          transform: translateX(-100%);
          z-index: 1;
        }
      }

      @keyframes hc-skeleton-animation {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(100%);
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SkeletonComponent {
  @Input() width = '100%'
  @Input() height = '1rem'
  @Input() size: string | null = null
  @Input() borderRadius: string | null = null

  get classes() {
    return {
      ['hc-skeleton']: true,
    }
  }

  get styles() {
    if (this.size) {
      return { width: this.size, height: this.size, borderRadius: this.borderRadius }
    } else {
      return { width: this.width, height: this.height }
    }
  }
}
