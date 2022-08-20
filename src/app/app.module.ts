import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserModule } from '@angular/platform-browser'
import { ComponentsModule } from './components/components.module'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ComponentsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
