import { RouterModule } from '@angular/router'
import { MenuItemComponent } from './menu-item.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MenuComponent } from './menu.component'

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [MenuComponent, MenuItemComponent, RouterModule],
})
export class MenuModule {}
