import { RegisterComponent } from './register.component'
import { render } from '@testing-library/angular'

describe('RegisterComponent', () => {
  const setup = async () => {
    return render(RegisterComponent)
  }

  it('should create a page register', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
