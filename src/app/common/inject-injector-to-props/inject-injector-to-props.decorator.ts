import { APP_INITIALIZER, Injector } from '@angular/core'
import {
  ICollection,
  NgModuleMetadata,
} from '@storybook/angular/dist/ts3.9/client/preview/types'

import { makeDecorator } from '@storybook/addons'

export const injectInjectorToProps = makeDecorator({
  name: 'injectInjectorToProps',
  parameterName: 'injectInjectorToProps',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context) => {
    const story = getStory(context) as {
      props: ICollection
      moduleMetadata: NgModuleMetadata
    }

    if (!story.moduleMetadata.providers) {
      story.moduleMetadata.providers = []
    }

    story.moduleMetadata.providers.push({
      provide: APP_INITIALIZER,
      useFactory: (injector: Injector): void => {
        Object.assign(story.props, { injector })
      },
      deps: [Injector],
    })

    return story
  },
})
