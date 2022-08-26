import { AuthenticationRoutingModule } from './authentication-routing.module'
import { ButtonModule } from 'src/app/components/button/button.module'
import { CommonModule } from '@angular/common'
import { IconModule } from 'src/app/components/icon/icon.module'
import { InputModule } from 'src/app/components/input/input.module'
import { LinkModule } from 'src/app/components/link/link.module'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SwitchModule } from 'src/app/components/switch/switch.module'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    InputModule,
    SwitchModule,
    ButtonModule,
    IconModule,
    LinkModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
