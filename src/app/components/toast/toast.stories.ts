import { Meta, Story, moduleMetadata } from '@storybook/angular'

import { ToastComponent } from './toast.component'
import { ToastModule } from './toast.module'

export default {
  component: ToastComponent,
  title: 'Messages/Toast',
  decorators: [
    moduleMetadata({
      imports: [ToastModule],
    }),
  ],
} as Meta

const Template: Story = (args) => ({
  props: args,
})

export const Severity = Template.bind({})
