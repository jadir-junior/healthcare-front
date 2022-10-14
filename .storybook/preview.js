// import '!style-loader!css-loader!sass-loader!../src/styles.scss'

import docJson from '../documentation.json'
import { setCompodocJson } from '@storybook/addon-docs/angular'

setCompodocJson(docJson)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}
