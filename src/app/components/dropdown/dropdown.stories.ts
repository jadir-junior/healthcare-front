import { Meta, Story } from '@storybook/angular'

import { DropdownComponent } from './dropdown.component'

export default {
  component: DropdownComponent,
  title: 'Overlay/Dropdown',
  excludeStories: /.*Data$/,
} as Meta

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
  props: {
    ...args,
  },
  template: `
  <div #actualTarget>
    <hc-dropdown #dropdown>
      dropdown
    </hc-dropdown>
    <button (click)="dropdown.toggle($event, actualTarget)">show</button>
  </div>
  `,
})

export const Dropdown = Template.bind({})
Dropdown.args = {}
