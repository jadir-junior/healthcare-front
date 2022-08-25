import { SwitchComponent } from './switch.component'
import { render } from '@testing-library/angular'

describe('SwitchComponent', () => {
  const setup = async () => {
    return render(SwitchComponent)
  }

  it('should create a switch', async () => {
    const { container } = await setup()
    expect(container).toBeTruthy()
  })
})
