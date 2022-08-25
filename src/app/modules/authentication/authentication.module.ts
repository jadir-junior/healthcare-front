import { AuthenticationRoutingModule } from './authentication-routing.module'
import { CommonModule } from '@angular/common'
import { InputModule } from 'src/app/components/input/input.module'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule, InputModule, ReactiveFormsModule],
})
export class AuthenticationModule {}
