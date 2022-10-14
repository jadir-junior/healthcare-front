import { Meta, Story, moduleMetadata } from '@storybook/angular'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Injector } from '@angular/core'
import { MessageService } from './message.service'
import { ToastComponent } from './toast.component'
import { ToastModule } from './toast.module'
import { injectInjectorToProps } from '../../common/inject-injector-to-props/inject-injector-to-props.decorator'

export default {
  component: ToastComponent,
  title: 'Messages/Toast',
  decorators: [
    moduleMetadata({
      imports: [ToastModule, BrowserAnimationsModule],
    }),
    injectInjectorToProps,
  ],
  parameters: {
    injectInjectorToProps: true,
  },
} as Meta

const Template: Story = (args) => ({
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

export const Severity = Template.bind({})
