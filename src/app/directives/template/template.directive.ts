/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Input, TemplateRef } from '@angular/core'

@Directive({
  selector: '[hcTemplate]',
})
export class TemplateDirective {
  @Input() type!: string

  @Input('hcTemplate') name!: string

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name
  }
}
