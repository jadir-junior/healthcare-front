import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SelectComponent } from './select.component'
import { SelectItemComponent } from './select-item.component'

@NgModule({
  declarations: [SelectComponent, SelectItemComponent],
  imports: [CommonModule],
  exports: [SelectComponent],
})
export class SelectModule {}
