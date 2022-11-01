import { CardModule } from './../../components/card/card.module'
import { DashboardComponent } from './dashboard.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { IconModule } from './../../components/icon/icon.module'
import { TabModule } from '../../components/tab/tab.module'
import { TableModule } from 'src/app/components/table/table.module'
import { TimelineEventsAndMeetingsComponent } from './components/timeline-events-and-meetings/timeline-events-and-meetings.component'
import { TimelineModule } from './../../components/timeline/timeline.module'
import { render } from '@testing-library/angular'

describe('DashboardComponent', () => {
  const setup = async () => {
    return render(DashboardComponent, {
      declarations: [TimelineEventsAndMeetingsComponent],
      imports: [
        CardModule,
        TimelineModule,
        IconModule,
        HttpClientTestingModule,
        TableModule,
        TabModule,
      ],
    })
  }

  it('should create a page dashboard', async () => {
    const { container } = await setup()
    expect(container).toBeInTheDocument()
  })
})
