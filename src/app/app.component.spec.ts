import { AppComponent } from './app.component'
import { InputModule } from './components/input/input.module'
import { ReactiveFormsModule } from '@angular/forms'
import { render } from '@testing-library/angular'

describe('AppComponent', () => {
  const setup = async () => {
    return render(AppComponent, {
      imports: [ReactiveFormsModule, InputModule],
    })
  }

  it('should create the container app', async () => {
    const { container } = await setup()
    expect(container).toBeTruthy()
  })
})
