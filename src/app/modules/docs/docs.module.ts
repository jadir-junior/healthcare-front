import { CommonModule } from '@angular/common'
import { DocsComponent } from './docs/docs.component'
import { DocsRoutingModule } from './docs-routing.module'
import { NgModule } from '@angular/core'

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, DocsRoutingModule],
})
export class DocsModule {}
