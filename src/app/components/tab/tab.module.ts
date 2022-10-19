import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TabPanelComponent } from './tab-panel.component'
import { TabsComponent } from './tabs.component'

@NgModule({
  declarations: [TabsComponent, TabPanelComponent],
  imports: [CommonModule],
  exports: [TabsComponent, TabPanelComponent],
})
export class TabModule {}
