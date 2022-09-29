import { CardModule } from '../../../components/card/card.module'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProfileComponent } from './profile.component'
import { render } from '@testing-library/angular'

describe('ProfileComponent', () => {
  const setup = async () => {
    return render(ProfileComponent, {
      imports: [HttpClientTestingModule, CardModule],
    })
  }

  it('create a page profile', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
