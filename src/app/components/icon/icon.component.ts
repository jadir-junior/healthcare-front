import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core'

import { IStyle } from './../../common/models/style.model'

@Component({
  selector: 'hc-icon',
  template: `
    <div
      #wrapperIcon
      [ngClass]="classes"
      class="material-symbols-outlined hc-icon"
      [ngStyle]="style"
    >
      {{ icon }}
    </div>
  `,
  styles: [
    `
      .hc-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon-size-small {
        font-size: 16px;
      }

      .icon-size-normal {
        font-size: 20px;
      }

      .icon-size-large {
        font-size: 24px;
      }

      .hc-icon-theme-contained {
        padding: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.3rem;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IconComponent implements AfterViewInit {
  @Input() icon!: string
  @Input() size: 'small' | 'normal' | 'large' = 'normal'
  @Input() theme: 'default' | 'contained' = 'default'
  @Input() color?: string
  @Input() style?: IStyle

  @ViewChild('wrapperIcon') wrapperIcon!: ElementRef

  ngAfterViewInit(): void {
    if (this.wrapperIcon && this.theme === 'contained') {
      this.wrapperIcon.nativeElement.style.backgroundColor = `${this.color}40`
      this.wrapperIcon.nativeElement.style.color = this.color
    }
  }

  public get classes() {
    return {
      [`icon-size-${this.size}`]: true,
      [`hc-icon-theme-${this.theme}`]: true,
    }
  }
}
