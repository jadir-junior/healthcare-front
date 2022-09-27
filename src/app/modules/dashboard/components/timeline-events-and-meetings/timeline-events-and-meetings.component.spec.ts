import { IconModule } from '../../../../components/icon/icon.module'
import { TimelineEventsAndMeetingsComponent } from './timeline-events-and-meetings.component'
import { TimelineModule } from '../../../../components/timeline/timeline.module'
import { render } from '@testing-library/angular'

describe('TimelineEventsAndMeetingsComponent', () => {
  const setup = async () => {
    return render(TimelineEventsAndMeetingsComponent, {
      imports: [TimelineModule, IconModule],
    })
  }

  it('should create a timeline', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
