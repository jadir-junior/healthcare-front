import { Meta, Story, moduleMetadata } from '@storybook/angular'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Injector } from '@angular/core'
import { MessageService } from './message.service'
import { ToastComponent } from './toast.component'
import { ToastItemComponent } from './toast-item.component'
import { injectInjectorToProps } from '../../common/inject-injector-to-props/inject-injector-to-props.decorator'

export default {
  title: 'Messages/Toast',
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      declarations: [ToastComponent, ToastItemComponent],
      providers: [MessageService],
    }),
    injectInjectorToProps,
  ],
  parameters: {
    injectInjectorToProps: true,
  },
} as Meta

export const Severity: Story = (args) => ({
  props: {
    ...args,
    showSuccess: (injector: Injector): void => {
      injector.get(MessageService).add({ severity: 'success', detail: 'Message content' })
    },
    showError: (injector: Injector): void => {
      injector.get(MessageService).add({ severity: 'error', detail: 'Message content' })
    },
  },
  template: `
    <div style="height: 600px">
      <hc-toast></hc-toast>
      <div style="display: flex; gap: 0.5rem">
        <button (click)="showSuccess(injector)" style="width: 140px; height: 40px; background: var(--green-default); border: none; color: white; cursor: pointer">Success</button>
        <button (click)="showError(injector)" style="width: 140px; height: 40px; background: var(--red-default); border: none; color: white; cursor: pointer">Error</button>
      </div>
    </div>
  `,
})
