import { CardModule } from './../../components/card/card.module'
import { DashboardComponent } from './dashboard.component'
import { IconModule } from './../../components/icon/icon.module'
import { TimelineModule } from './../../components/timeline/timeline.module'
import { render } from '@testing-library/angular'

describe('DashboardComponent', () => {
  const setup = async () => {
    return render(DashboardComponent, {
      imports: [CardModule, TimelineModule, IconModule],
    })
  }

  it('should create a page dashboard', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
