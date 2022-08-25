import { AuthenticationRoutingModule } from './authentication-routing.module'
import { CommonModule } from '@angular/common'
import { InputModule } from 'src/app/components/input/input.module'
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
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
