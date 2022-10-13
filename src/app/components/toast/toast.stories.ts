import { Meta, Story, moduleMetadata } from '@storybook/angular'

import { ButtonModule } from '../button/button.module'
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
      imports: [ToastModule, ButtonModule],
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
  },
  template: `
    <button (click)="showSuccess(injector)">open toast</button>
  `,
})

export const Severity = Template.bind({})
