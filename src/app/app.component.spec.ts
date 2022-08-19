import { AppComponent } from './app.component'
import { render } from '@testing-library/angular'

describe('AppComponent', () => {
  const setup = async () => {
    return render(AppComponent)
  }

  it('should create the container app', async () => {
    const { container } = await setup()
    expect(container).toBeTruthy()
  })
})
