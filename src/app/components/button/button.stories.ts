import { Meta, Story } from '@storybook/angular'

import { ButtonComponent } from './button.component'
import { action } from '@storybook/addon-actions'

export default {
  component: ButtonComponent,
  title: 'Button',
  excludeStories: /.*Data$/,
} as Meta

export const actionsData = {
  clickEvent: action('clickEvent'),
}

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: {
    ...args,
    clickEvent: actionsData.clickEvent,
  },
  template: `<hc-button [theme]="theme" [color]="color" [type]="type" [ariaLabel]="ariaLabel" [disabled]="disabled">Button</hc-button>`,
})

export const ThemeContained = Template.bind({})
ThemeContained.args = {
  ariaLabel: 'button-default',
}

export const ThemeText = Template.bind({})
ThemeText.args = {
  theme: 'text',
  color: 'primary',
}

export const ThemeOutlined = Template.bind({})
ThemeOutlined.args = {
  theme: 'outlined',
  color: 'primary',
}
