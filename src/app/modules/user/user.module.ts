import { AvatarModule } from '../../components/avatar/avatar.module'
import { CardModule } from './../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfileBackgroundComponent } from './components/profile-background/profile-background.component'
import { ProfileComponent } from './profile/profile.component'
import { TemplateModule } from '../../directives/template/template.module'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, ProfileBackgroundComponent],
  imports: [CommonModule, UserRoutingModule, CardModule, AvatarModule, TemplateModule],
})
export class UserModule {}
