import { BadgeComponent } from './badge.component'
import { BadgeDirective } from './badge.directive'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [BadgeComponent, BadgeDirective],
  imports: [CommonModule],
  exports: [BadgeComponent, BadgeDirective],
})
export class BadgeModule {}
