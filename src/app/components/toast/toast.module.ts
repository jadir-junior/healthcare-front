import { CommonModule } from '@angular/common'
import { MessageService } from './message.service'
import { NgModule } from '@angular/core'
import { ToastComponent } from './toast.component'
import { ToastItemComponent } from './toast-item.component'

@NgModule({
  declarations: [ToastComponent, ToastItemComponent],
  imports: [CommonModule],
  providers: [MessageService],
  exports: [ToastComponent],
})
export class ToastModule {}
