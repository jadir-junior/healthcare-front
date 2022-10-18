import { Meta, Story } from '@storybook/angular'

import { SwitchComponent } from './switch.component'

export default {
  component: SwitchComponent,
  title: 'Form/Switch',
  excludeStories: /.*Data$/,
  argTypes: {
    checked: {
      table: {
        disable: true,
      },
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
    onFocus: {
      table: {
        disable: true,
      },
    },
    registerOnChange: {
      table: {
        disable: true,
      },
    },
    registerOnTouched: {
      table: {
        disable: true,
      },
    },
    setDisabledState: {
      table: {
        disable: true,
      },
    },
    toggle: {
      table: {
        disable: true,
      },
    },
    updateModel: {
      table: {
        disable: true,
      },
    },
    writeValue: {
      table: {
        disable: true,
      },
    },
    cd: {
      table: {
        disable: true,
      },
    },
    focused: {
      table: {
        disable: true,
      },
    },
    falseValue: {
      table: {
        disable: true,
      },
    },
    onModelChange: {
      table: {
        disable: true,
      },
    },
    onModelTouched: {
      table: {
        disable: true,
      },
    },
    trueValue: {
      table: {
        disable: true,
      },
    },
  },
} as Meta

const Template: Story<SwitchComponent> = (args: SwitchComponent) => ({
  props: args,
})

export const Switch = Template.bind({})
Switch.args = {
  modelValue: true,
}

export const Label: Story<SwitchComponent> = () => ({
  props: {
    label: 'Remember Me',
  },
})

export const Readonly: Story<SwitchComponent> = () => ({
  props: {
    readonly: true,
  },
})

export const Disabled: Story<SwitchComponent> = () => ({
  props: {
    disabled: true,
  },
})

export const DisabledTrue: Story<SwitchComponent> = () => ({
  props: {
    disabled: true,
    modelValue: true,
  },
})

export const PreSelection: Story<SwitchComponent> = () => ({
  props: {
    modelValue: true,
  },
})
