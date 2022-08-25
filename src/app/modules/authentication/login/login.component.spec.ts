import { InputModule } from 'src/app/components/input/input.module'
import { LoginComponent } from './login.component'
import { ReactiveFormsModule } from '@angular/forms'
import { render } from '@testing-library/angular'

describe('LoginComponent', () => {
  const setup = async () => {
    return render(LoginComponent, {
      imports: [ReactiveFormsModule, InputModule],
    })
  }

  it('should create a login page', async () => {
    const { container } = await setup()

    expect(container).toBeInTheDocument()
  })
})
