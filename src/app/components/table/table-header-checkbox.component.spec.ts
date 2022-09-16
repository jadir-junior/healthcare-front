import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TableHeaderCheckboxComponent } from './table-header-checkbox.component'

describe('TableHeaderCheckboxComponent', () => {
  let component: TableHeaderCheckboxComponent
  let fixture: ComponentFixture<TableHeaderCheckboxComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableHeaderCheckboxComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TableHeaderCheckboxComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
