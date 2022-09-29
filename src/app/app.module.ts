import { LOCALE_ID, NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { MarkdownModule } from 'ngx-markdown'
import { MswModule } from './components/msw/msw.module'
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common'

registerLocaleData(localePt, 'pt')

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MswModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
