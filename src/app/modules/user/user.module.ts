import { AvatarModule } from '../../components/avatar/avatar.module'
import { CardModule } from './../../components/card/card.module'
import { CommonModule } from '@angular/common'
import { EditComponent } from './edit/edit.component'
import { IconModule } from './../../components/icon/icon.module'
import { NgModule } from '@angular/core'
import { PhoneModule } from './../../pipes/phone/phone.module'
import { ProfileBackgroundComponent } from './components/profile-background/profile-background.component'
import { ProfileComponent } from './profile/profile.component'
import { RemoveHttpUrlModule } from '../../pipes/remove-http-url/remove-http-url.module'
import { TemplateModule } from '../../directives/template/template.module'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, ProfileBackgroundComponent, EditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CardModule,
    AvatarModule,
    TemplateModule,
    IconModule,
    RemoveHttpUrlModule,
    PhoneModule,
  ],
})
export class UserModule {}
