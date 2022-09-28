import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
