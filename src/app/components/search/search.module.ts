import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SearchComponent } from './search.component'

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SearchComponent, ReactiveFormsModule],
})
export class SearchModule {}
