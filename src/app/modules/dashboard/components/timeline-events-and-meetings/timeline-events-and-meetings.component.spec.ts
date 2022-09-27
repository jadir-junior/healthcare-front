import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TimelineEventsAndMeetingsComponent } from './timeline-events-and-meetings.component'

describe('TimelineEventsAndMeetingsComponent', () => {
  let component: TimelineEventsAndMeetingsComponent
  let fixture: ComponentFixture<TimelineEventsAndMeetingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineEventsAndMeetingsComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TimelineEventsAndMeetingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
