import { render, screen } from '@testing-library/angular'
import { AvatarComponent } from './avatar.component'

describe('AvatarComponent', () => {
  it('create a avatar label', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'J',
      },
    })

    expect(screen.getByText(/j/i)).toBeInTheDocument()
  })

  it('create a avatar circle', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'J',
        circle: true,
      },
    })

    expect(screen.getByTestId(/avatar/i)).toHaveClass('hc-avatar-circle')
  })

  it('create a avatar with size small', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'J',
        size: 'small',
      },
    })

    expect(screen.getByTestId(/avatar/i)).toHaveClass('hc-avatar-size-small')
  })

  it('create a avatar with size medium', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'J',
        size: 'medium',
      },
    })

    expect(screen.getByTestId(/avatar/i)).toHaveClass('hc-avatar-size-medium')
  })

  it('create a avatar with size large', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        label: 'J',
        size: 'large',
      },
    })

    expect(screen.getByTestId(/avatar/i)).toHaveClass('hc-avatar-size-large')
  })

  it('create a avatar with icon', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        icon: 'person',
        size: 'large',
      },
    })

    expect(screen.getByTestId(/avatar/i).querySelector('span')).toHaveClass(
      'hc-avatar-icon'
    )
  })

  it('create a avatar with image', async () => {
    await render(AvatarComponent, {
      componentProperties: {
        image: 'fake-image',
        size: 'large',
      },
    })

    expect(screen.getByTestId(/avatar/i).querySelector('img')).toHaveClass(
      'hc-avatar-image'
    )
  })
})
